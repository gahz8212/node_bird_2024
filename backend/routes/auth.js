const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const { User } = require("../models");

// let users = [];
router.post("/join", async (req, res) => {
  const { email, name, rank, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.status(400).json("이미 등록된 이메일 입니다.");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({ email, name, password: hash, rank });
    return res.status(200).json("join_ok");
  } catch (e) {
    return res.status(400).json(e.message);
  }
});
router.post("/login", (req, res) => {
  passport.authenticate("local", (authError, user, info) => {
    try {
      if (authError) {
        throw new Error(authError);
      }
      if (!user) {
        throw new Error(info.message);
      }
      return req.login(user, (loginError) => {
        if (loginError) {
          throw new Error(loginError);
        } else {
          req.app
            .get("io")
            .of("/room")
            .emit("chat", {
              chat: `${req.user.name}님이 로그인 됨`,
              name: "system",
            });
          // let expires = new Date(Date.now() + 6000);
          // req.session.cookie.expires = expires;
          // res.setHeader(
          //   "Set-Cookie",
          //   `connect.sid=s%3A${
          //     req.sessionID
          //   }; Expires=${expires.toUTCString()}; HttpOnly; path=/`
          // );

          // console.log(req.session);
          return res.status(200).json("login_ok");
        }
      });
    } catch (e) {
      return res.status(400).json(e.message);
    }
  })(req, res);
});
router.post("/logout", (req, res) => {
  req.app
    .get("io")
    .of("/room")
    .emit("chat", {
      chat: `${req.user.name}님이 로그아웃 됨`,
      name: "system",
    });

  req.logout((e) => {
    if (e) {
      return;
    }

    req.session.destroy(() => {
      res.clearCookie("connect.sid", {
        httpOnly: true,
        secure: false,
        path: "/",
      });
      res.send("logout_ok");
    });
  });
});
router.get("/check", (req, res) => {
  try {
    const { id, name, rank } = req.user;

    let expires = new Date(Date.now() + 6000);
    req.session.cookie.expires = expires;
    return res
      .status(200)
      .json({ auth: { id, name, rank }, expires: expires.toUTCString() });
  } catch (e) {
    return res.status(400).json(e.message);
  }
});
router.post("/extends", (req, res) => {
  console.log("extends");

  req.session.touch();

  let expires = new Date(Date.now() + 60000);
  req.session.cookie.expires = expires;
  console.log(req.sessionID);
  // res.setHeader(
  //   "Set-Cookie",
  //   `connect.sid=s%3A${
  //     req.sessionID
  //   }; Expires=${expires.toUTCString()}; HttpOnly; path=/`
  // );

  // console.log("after ", expires);
  console.log("after ", req.session.cookie);

  res.status(200).json(expires.toUTCString());
});
module.exports = router;
