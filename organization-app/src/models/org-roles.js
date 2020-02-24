'use strict'
module.exports = (sequelize, DataTypes) => {
   var org_roles = sequelize.define('org_roles', {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
      role_name: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
      is_active: {
         type: DataTypes.BOOLEAN,
         allowNull: true,
      },
      organization_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      parent_role: {
         type: DataTypes.INTEGER,
         allowNull: true,
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

   org_roles.associate = function(models) {
      models.org_roles.hasMany(models.entitlements, {
         onDelete: 'NO ACTION',
         foreignKey: 'roles_id',
         as: 'entitlements',
         allowNull: true,
      })

      models.org_roles.hasMany(models.org_user, {
         onDelete: 'NO ACTION',
         foreignKey: 'roles_id',
         as: 'users',
         allowNull: false,
      })

      models.org_roles.belongsTo(models.organization, {
         onDelete: 'NO ACTION',
         foreignKey: 'organization_id',
         as: 'organization',
         allowNull: false,
      })

      models.org_roles.belongsTo(models.org_roles, {
         onDelete: 'NO ACTION',
         foreignKey: 'parent_role',
         as: 'reporting_role',
         allowNull: true,
      })
   }

   return org_roles
}
