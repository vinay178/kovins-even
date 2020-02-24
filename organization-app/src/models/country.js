'use strict'
module.exports = (sequelize, DataTypes) => {
   var country = sequelize.define('country', {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
      country_name: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
         defaultValue: 'INDIA',
      },
      time_stamp: {
         type: DataTypes.DATE,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
   })

   country.associate = function(models) {
      models.country.hasOne(models.organization, {
         onDelete: 'NO ACTION',
         foreignKey: 'country_id',
         as: 'organizations',
         allowNull: false,
      })
   }

   return country
}
