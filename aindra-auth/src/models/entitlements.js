'use strict'
module.exports = (sequelize, DataTypes) => {
   var entitlements = sequelize.define('entitlements', {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
      oper_name: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
      is_active: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
      },
      roles_id: {
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

   entitlements.associate = function(models) {
      models.entitlements.belongsTo(models.org_roles, {
         onDelete: 'NO ACTION',
         foreignKey: 'roles_id',
         as: 'roles',
         allowNull: false,
      })
   }

   return entitlements
}
