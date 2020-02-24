'use strict'
module.exports = (sequelize, DataTypes) => {
   var org_user = sequelize.define('org_user', {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
         allowNull: false,
      },
      firstname: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      lastname: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      gender: {
         type: DataTypes.ENUM('male', 'female', 'others'),
         allowNull: false,
      },
      emailaddress: {
         type: DataTypes.STRING,
         allowNull: true,
         validate: {
            notEmpty: true,
            isEmail: true,
         },
      },
      phone_number: {
         type: DataTypes.STRING,
         allowNull: true
      },
      roles_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      department_id: {
         type: DataTypes.INTEGER,
         allowNull: true,
      },
      locations_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      manager_id: {
         type: DataTypes.INTEGER,
         allowNull: true,
      },
      is_active: {
         type: DataTypes.BOOLEAN,
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

   org_user.associate = function(models) {
      models.org_user.belongsTo(models.org_roles, {
         onDelete: 'NO ACTION',
         foreignKey: 'roles_id',
         as: 'role',
         allowNull: false,
      })

      models.org_user.belongsTo(models.org_department, {
         onDelete: 'NO ACTION',
         foreignKey: 'department_id',
         as: 'department',
         allowNull: true,
      })

      models.org_user.belongsTo(models.location, {
         onDelete: 'NO ACTION',
         foreignKey: 'locations_id',
         as: 'location',
         allowNull: false,
      })

      models.org_user.belongsTo(models.org_user, {
         onDelete: 'NO ACTION',
         foreignKey: 'manager_id',
         as: 'manager',
         allowNull: true,
      })
   }

   return org_user
}
