const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");
const bcrypt = require("bcrypt");
module.exports = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({ where: { email } });
          if (exUser) {
            const result = bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: "비밀번호 오류" });
            }
          } else {
            done(null, false, { message: "이메일 오류" });
          }
        } catch (e) {
          done(e);
        }
      }
    )
  );
};
