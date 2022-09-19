const dbConfig = require("./dbConfig");

module.exports = {
  "development": {
    "username": dbConfig.USER,
    "password": dbConfig.PASSWORD,
    "database": dbConfig.DATABASE,
    "host": dbConfig.HOST,
    "dialect": "postgres",
    "logging": false,
  },
  "test": {
    "username": dbConfig.USER,
    "password": dbConfig.PASSWORD,
    "database": dbConfig.DATABASE,
    "host": dbConfig.HOST,
    "dialect": "postgres",
    "logging": false,
  },
  "production": {
    "username": dbConfig.USER,
    "password": dbConfig.PASSWORD,
    "database": dbConfig.DATABASE,
    "host": dbConfig.HOST,
    "dialect": "postgres",
    "logging": false,
  }
}
