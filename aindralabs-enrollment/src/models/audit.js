module.exports = function(sequelize, DataTypes) {
  const audit = sequelize.define('audits',
  {
    correlationId: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    timestamps:true
  }
  );

  return audit;
};
