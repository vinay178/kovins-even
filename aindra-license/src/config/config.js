module.exports = {
   development: {
      username: process.env.DB_DEV_USERNAME,
      password: process.env.DB_DEV_PASSWORD,
      database: process.env.DB_DEV_DATABASE,
      host: process.env.DB_DEV_URL,
      dialect: 'mysql',
      dialectOptions: {
         dateStrings: true,
      },
      logging: false,
      define: {
         timestamps: false, // I do not want timestamp fields by default
      },
      dialectOptions: {
         dateStrings: true,
      },
   },
   test: {
      username: 'root',
      password: 'password',
      database: 'project',
      host: '127.0.0.1',
      insecureAuth: true,
      dialect: 'mysql',
      dialectOptions: {
         dateStrings: true,
      },
      logging: false,
      define: {
         timestamps: false,
      },
   },
   production: {
      username: process.env.DB_PRO_USERNAME,
      password: process.env.DB_PRO_PASSWORD,
      database: process.env.DB_PRO_DATABASE,
      host: process.env.DB_PRO_URL,
      dialect: 'mysql',
      dialectOptions: {
         useUTC: false, // for reading from database
         dateStrings: true,
      },
      define: {
         timestamps: false,
      },
   },
}
