const Sequelize = require("sequelize");
const path = require("path");
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "../config/config.json"))[env];
const User = require("./user");
const Chat = require("./chat");
const Image = require("./image");
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.Chat = Chat;
db.Image = Image;
User.init(sequelize);
Chat.init(sequelize);
Image.init(sequelize);
User.associate(db);
Chat.associate(db);
Image.associate(db);
module.exports = db;
