module.exports = {
  "development": {
    "username": process.env.DB_DEV_USERNAME,
    "password": process.env.DB_DEV_PASSWORD,
    "database": process.env.DB_DEV_DATABASE,
    "host": process.env.DB_DEV_URL,
    "dialect": "mysql",
    "logging": false,
    "define": {
      "timestamps": false
    }
  },
  "test": {
    "username": "root",
    "password": "password",
    "database": "project",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": false
  },
  "production": {
    "username": process.env.DB_PRO_USERNAME,
   "password": process.env.DB_PRO_PASSWORD,
   "database": process.env.DB_PRO_DATABASE,
   "host": process.env.DB_PRO_URL,
   "dialect": "mysql",
   "define": {
     "timestamps": false
   }
  }
}
