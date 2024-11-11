require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const passport = require("passport");
const cors = require("cors");
const passportConfig = require("./passport");
const { sequelize } = require("./models");
const authRoute = require("./routes/auth");
const itemRoute = require("./routes/item");
const chatRoute = require("./routes/chat");
const { createServer } = require("http");
const webServer = require("./socket");

const app = express();
app.use(cors());
const server = createServer(app);
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

const sessionMiddleware = session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
  cookie: { httpOnly: true, secure: false },
});
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", authRoute);
app.use("/item", itemRoute);
app.use("/home", chatRoute);
server.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 포트에서 서버 대기 중`);
});
webServer(app, server, sessionMiddleware);
