"use strict";
require("dotenv").config();
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../config/config.js")[env];
const db = {};

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config,
    {
      define: {
        underscored: true
      },
      operatorsAliases: {
        $and: Op.and,
        $or: Op.or,
        $eq: Op.eq,
        $gt: Op.gt,
        $lt: Op.lt,
        $lte: Op.lte,
        $like: Op.like,
        $in: Op.in
      }
      //logging: false
    }
  );
} else {
var sequelize = new Sequelize(config.database, config.username, config.password, config,
  {
    define: {
      underscored: true
    },
    operatorsAliases: {
      $and: Op.and,
      $or: Op.or,
      $eq: Op.eq,
      $gt: Op.gt,
      $lt: Op.lt,
      $lte: Op.lte,
      $like: Op.like,
      $in: Op.in
    }
      //logging: false
  });
}

db.enrollment = require('./aindra_enrolledimages')(sequelize, Sequelize);
db.verificationImage = require('./aindra_verificationimage')(sequelize, Sequelize);
db.audit = require('./audit')(sequelize, Sequelize);

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Sequelize.Op;

module.exports = db;
