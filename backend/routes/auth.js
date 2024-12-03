const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const userList = new Set();
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
  userList.delete(req.user.name);
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
      console.log(Array.from(userList.values()));
      req.app
        .get("io")
        .of("/room")
        .emit("logout_response", Array.from(userList.values()));
      return res.status(200).json({ userList: Array.from(userList.values()) });
    });
  });
});
router.get("/check", (req, res) => {
  try {
    const { id, name, rank } = req.user;

    let expires = Date.now() + 60000;
    req.session.cookie.expires = expires;
    req.app
      .get("io")
      .of("/room")
      .emit("chat", {
        chat: `${req.user.name}님이 로그인 됨`,
        name: "system",
      });
    console.log(Array.from(userList.values()));
    req.app
      .get("io")
      .of("/room")
      .emit("login_response", Array.from(userList.values()));
    userList.add(req.user.name);
    return res.status(200).json({
      auth: { id, name, rank },
      expires,
      userList: Array.from(userList.values()),
    });
  } catch (e) {
    return res.status(400).json(e.message);
  }
});
router.post("/extends", (req, res) => {
  console.log("extends");

  req.session.touch();

  let expires = new Date(Date.now() + 60000);
  req.session.cookie.expires = expires;
  res.status(200).json(expires.toUTCString());
});
module.exports = router;
