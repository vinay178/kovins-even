'use strict'
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.js')[env]
const db = {}
let sequelize
if (config.use_env_variable) {
   sequelize = new Sequelize(process.env[config.use_env_variable], config, {
      operatorsAliases: {
         $and: Op.and,
         $or: Op.or,
         $eq: Op.eq,
         $gt: Op.gt,
         $lt: Op.lt,
         $lte: Op.lte,
         $like: Op.like,
         $in: Op.in,
         $regexp: Op.regexp,
      },
   })
} else {
   sequelize = new Sequelize(config.database, config.username, config.password, config, {
      operatorsAliases: {
         $and: Op.and,
         $or: Op.or,
         $eq: Op.eq,
         $gt: Op.gt,
         $lt: Op.lt,
         $lte: Op.lte,
         $like: Op.like,
         $in: Op.in,
         $regexp: Op.regexp,
      },
   })
}

db.country = require('./country')(sequelize, Sequelize)
db.geo_fencing_type = require('./geo-fencing-type')(sequelize, Sequelize)
db.organization = require('./organization')(sequelize, Sequelize)
db.org_department = require('./org-department')(sequelize, Sequelize)
db.location = require('./locations')(sequelize, Sequelize)
db.entitlements = require('./entitlements')(sequelize, Sequelize)
db.org_roles = require('./org-roles')(sequelize, Sequelize)
db.org_user = require('./org-user')(sequelize, Sequelize)
db.license_keys = require('./license-keys')(sequelize, Sequelize)
db.license_plans = require('./license-plans')(sequelize, Sequelize)

fs.readdirSync(__dirname)
   .filter(file => {
      return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
   })
   .forEach(file => {
      const model = sequelize['import'](path.join(__dirname, file))
      db[model.name] = model
   })

Object.keys(db).forEach(modelName => {
   if ('associate' in db[modelName]) {
      db[modelName].associate(db)
   }
})

db.sequelize = sequelize
db.Sequelize = Sequelize
db.Op = Sequelize.Op

module.exports = db
