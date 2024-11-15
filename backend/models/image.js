const Sequelize = require("sequelize");
module.exports = class Image extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        image: { type: Sequelize.STRING(200) },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Image.belongsTo(db.User);
  }
};
