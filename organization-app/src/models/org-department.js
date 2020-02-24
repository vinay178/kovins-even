'use strict'
module.exports = (sequelize, DataTypes) => {
   var org_department = sequelize.define('org_department', {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
      dept_name: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
      parent_dept: {
         type: DataTypes.INTEGER,
         allowNull: true,
      },
      is_active: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
      },
      organization_id: {
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

   org_department.associate = function(models) {
      models.org_department.hasMany(models.org_user, {
         onDelete: 'NO ACTION',
         foreignKey: 'department_id',
         as: 'users',
      })

      models.org_department.belongsTo(models.organization, {
         onDelete: 'NO ACTION',
         foreignKey: 'organization_id',
         as: 'organization',
         allowNull: false,
      })
   }

   return org_department
}
