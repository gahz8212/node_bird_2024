const { Sequelize, Op, DataTypes } = require("sequelize");
const dayjs = require("dayjs");
const sequelize = new Sequelize("sqlite::memory:");
const Ship = sequelize.define(
  "Ship",
  {
    name: DataTypes.STRING,
    crewCapacity: DataTypes.INTEGER,
    amountOfsails: DataTypes.INTEGER,
  },
  { timestamps: false }
);
const Captain = sequelize.define(
  "Captain",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
    skillLevel: { type: DataTypes.INTEGER, validate: { min: 1, max: 10 } }, //속성이 두개 이상이면 {}로 묶고 하나면 묶지 않아도 상관없다.
  },
  { timestamps: false }
);
Captain.hasMany(Ship);
Ship.belongsTo(Captain, { targetKey: "id", foreignKey: "BossId" });

(async () => {
  await sequelize.sync({ force: true });
  await Captain.create({ name: "jack sparrow", skillLevel: 8 });
  await Ship.create({
    name: "black pearl",
    crewCapacity: 10,
    amountOfsails: 100,
    BossId: 1,
  });

  const ship = await Ship.findOne({
    where: { id: 1 },
    include: Captain,
  });
  console.log(ship.Captain.name);
  // const captain = await Captain.findOne({
  //   where: { id: 1 },
  //   include: Ship,
  // });
  // console.log(captain);
})();
