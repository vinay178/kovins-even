module.exports = (sequelize, DataTypes) => {
   var organization = sequelize.define('organization', {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
      org_name: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
      smart_verification_type: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
      geofencing_active: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
         defaultValue: true,
      },
      geofencing_radius: {
         type: DataTypes.DOUBLE,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
      website_access_active: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
         defaultValue: true,
      },
      license_plan_type: {
         type: DataTypes.INTEGER,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
      license_key_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
      is_active: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
      },
      geo_fencing_type_id: {
         type: DataTypes.INTEGER,
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

   organization.associate = function(models) {
      models.organization.hasMany(models.org_department, {
         onDelete: 'NO ACTION',
         onUpdate: 'CASCADE',
         foreignKey: 'organization_id',
      })

      models.organization.hasMany(models.location, {
         onDelete: 'NO ACTION',
         onUpdate: 'CASCADE',
         foreignKey: 'organization_id',
      })

      models.organization.hasMany(models.org_roles, {
         onDelete: 'NO ACTION',
         onUpdate: 'CASCADE',
         foreignKey: 'organization_id',
      })

      models.organization.belongsTo(models.country, {
         onDelete: 'NO ACTION',
         foreignKey: 'country_id',
      })

      models.organization.belongsTo(models.geo_fencing_type, {
         onDelete: 'NO ACTION',
         foreignKey: 'geo_fencing_type_id',
      })

      models.organization.belongsTo(models.license_keys, {
         onDelete: 'NO ACTION',
         foreignKey: 'license_key_id',
      })

      models.organization.belongsTo(models.license_plans, {
         onDelete: 'NO ACTION',
         foreignKey: 'license_plan_type',
      })
   }

   return organization
}
