"use strict";
require("dotenv").config();
var path = require("path");
var fs = require("fs");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;
const env = 'test';
const config = require('../../src/config/config.js')[env];
const db = {};


const sequelize = new Sequelize(config.database, config.username, config.password, config,
  {
      operatorsAliases: {
          $and: Op.and,
          $or: Op.or,
          $eq: Op.eq,
          $gt: Op.gt,
          $lt: Op.lt,
          $lte: Op.lte,
          $like: Op.like,
          $in: Op.in,
          $regexp: Op.regexp
      }
      //logging: false
  }
);


db.enrollment = require('../../src/models/aindra_enrolledimages')(sequelize, Sequelize);
db.verificationImage = require('../../src/models/aindra_verificationimage')(sequelize, Sequelize);
db.audit = require('../../src/models/audit')(sequelize, Sequelize);

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


// Models
db.sequelize.sync({
    force: false
}).then(() => {
}).catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!");
});

module.exports = db;
