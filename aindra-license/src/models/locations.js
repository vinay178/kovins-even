'use strict'
module.exports = (sequelize, DataTypes) => {
   var location = sequelize.define('location', {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
      address: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
      city: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
      state: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
      pincode: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
      organization_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      is_active: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
      },
      country_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      time_stamp: {
         type: DataTypes.DATE,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
      deleted: {
         type: DataTypes.BOOLEAN,
         allowNull: true,
         defaultValue: false,
      },
   })

   location.associate = function(models) {
      models.location.hasOne(models.org_user, {
         onDelete: 'NO ACTION',
         foreignKey: 'locations_id',
         as: 'users',
         allowNull: false,
      })

      models.location.belongsTo(models.organization, {
         onDelete: 'NO ACTION',
         foreignKey: 'organization_id',
         as: 'organization',
         allowNull: false,
      })

      models.location.belongsTo(models.country, {
         onDelete: 'NO ACTION',
         foreignKey: 'country_id',
         as: 'country',
         allowNull: false,
      })
   }

   return location
}
