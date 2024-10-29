require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const passport = require("passport");
const passportConfig = require("./passport");
const { sequelize } = require("./models");
const authRoute = require("./routes/auth");
const itemRoute = require("./routes/item");
const orderRoute = require("./routes/order");
const app = express();
passportConfig();
sequelize
  .sync({ force: false })
  .then(() => console.log("데이터베이스에 연결 됨."))
  .catch((e) => {
    console.error(e.message);
  });
app.set("port", process.env.PORT || 4000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/img", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    cookie: { httpOnly: true, secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", authRoute);
app.use("/item", itemRoute);
app.use("/order", orderRoute);
app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 포트에서 서버 대기 중`);
});
