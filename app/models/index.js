const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.ingrediente = require("./ingrediente.model")(sequelize, Sequelize);
db.empleado = require("./empleado.model")(sequelize, Sequelize);
db.menu = require("./menu.model")(sequelize, Sequelize);
db.categoria = require("./categoria.model")(sequelize, Sequelize);
db.cliente = require("./cliente.model")(sequelize, Sequelize);


db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});


db.ingrediente.hasMany(db.menu,)
db.menu.belongsTo(db.ingrediente);



db.ROLES = ["user", "admin", "waiter"];

module.exports = db;