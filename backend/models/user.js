const Sequelize = require("sequelize");
module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: { type: Sequelize.STRING(100), unique: true, allowNull: false },
        name: { type: Sequelize.STRING(10), allowNull: false },
        password: { type: Sequelize.STRING(200), allowNull: false },
        rank: { type: Sequelize.NUMBER, allowNull: true, defaultValue: 0 },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        paranoid: false,
        modelName: "User",
        freezeTableName: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Chat);
    db.User.hasMany(db.Image);
  }
};
