module.exports = (sequelize, DataTypes) => {
   var license_plans = sequelize.define('license_plans', {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
      license_plan_name: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
      license_validity_period_days: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      license_max_user_count: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      license_other_criteria: {
         type: DataTypes.STRING,
         allowNull: true,
      },
   })

   license_plans.associate = function(models) {
      models.license_plans.hasMany(models.license_keys, {
         onDelete: 'NO ACTION',
         onUpdate: 'CASCADE',
         foreignKey: 'license_plan_id',
      })
   }

   return license_plans
}
