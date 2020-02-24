module.exports = (sequelize, DataTypes) => {
   var license_keys = sequelize.define('license_keys', {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
      license_key: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
      utc_start_date: {
         type: DataTypes.DATE,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
      utc_expiry_date: {
         type: DataTypes.DATE,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
      timezone: {
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
      current_num_of_users: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      license_plan_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      record_last_modified: {
         type: DataTypes.DATE,
         allowNull: false,
         defaultValue: new Date(),
         validate: {
            notEmpty: true,
         },
      },
   })

   license_keys.associate = function(models) {
      models.license_keys.belongsTo(models.license_plans, {
         onDelete: 'NO ACTION',
         foreignKey: 'license_plan_id',
         allowNull: false,
      })
   }
   return license_keys
}
