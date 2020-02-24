module.exports = function(sequelize, DataTypes) {
  const aindra_verificationimage = sequelize.define('aindra_verificationimage', {
    jobId:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    jobType:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      defaultValue: 'VERIFY'
    },
    person_id:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    organization_id:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    firebaseDeviceIdentifier:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    url:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    timestamp: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    timeZone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    verificationStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'VERIFIED FAILED',
      validate: {
        notEmpty: true
      }
    },
    livelinessFailed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    x: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue:0,
      validate: {
        notEmpty: true
      }
    },
    y: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue:0,
      validate: {
        notEmpty: true
      }
    },
    w: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue:0,
      validate: {
        notEmpty: true
      }
    },
    h: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue:0,
      validate: {
        notEmpty: true
      }
    },
    confidentiality: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue:0,
      validate: {
        notEmpty: true
      }
    },
    sessionType: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 1,
      validate: {
        notEmpty: true
      }
    }
  },
  {
    timestamps:true
  }
  );

  return aindra_verificationimage;
};
