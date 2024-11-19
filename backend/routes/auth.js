const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const users = [];
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
          req.app.get("io").of("/room").users = users;
          if (!users.includes(req.user.name)) {
            users.push(req.user.name);
          }
          // req.app.get("io").of("/room").users = users;
          req.app
            .get("io")
            .of("/room")
            .emit("chat", {
              chat: `${req.user.name}님이 로그인 됨`,
              name: "system",
              userList: users,
            });
          console.log("userList", req.app.get("io").of("/room").users);
          return res.status(200).json("login_ok");
        }
      });
    } catch (e) {
      return res.status(400).json(e.message);
    }
  })(req, res);
});
router.post("/logout", (req, res) => {
  const newUserList = users.filter((user) => user !== req.user.name);
  req.app.get("io").of("/room").users = newUserList;
  // console.log("userList", req.app.get("io").of("/room").users);
  req.app
    .get("io")
    .of("/room")
    .emit("chat", {
      chat: `${req.user.name}님이 로그아웃 됨`,
      name: "system",
      userList: newUserList,
    });

  req.logout((e) => {
    if (e) {
      return;
    }

    req.session.destroy();
    return res.send("logout_ok");
  });
});
router.get("/check", (req, res) => {
  try {
    const { id, name, rank } = req.user;
    return res.status(200).json({ id, name, rank });
  } catch (e) {
    return res.status(400).json(e.message);
  }
});
module.exports = router;
