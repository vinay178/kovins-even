module.exports = (sequelize, DataTypes) => {
   var geo_fencing_type = sequelize.define('geo_fencing_type', {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
      time_stamp: {
         type: DataTypes.DATE,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
   })

   geo_fencing_type.associate = function(models) {
      models.geo_fencing_type.hasOne(models.organization, {
         onDelete: 'NO ACTION',
         foreignKey: 'geo_fencing_type_id',
         as: 'organizations',
         allowNull: false,
      })
   }

   return geo_fencing_type
}
