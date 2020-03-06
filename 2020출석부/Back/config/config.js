require('dotenv').config();

module.exports = {
  development: {
    database: 'dmidev',
    username: 'root',
    password: process.env.DB_PW,
    dialect: 'mysql',
    host: 'localhost',
    operatorAliases: false
  },
  production: {
    database: 'dmi',
    username: 'root',
    password: process.env.DB_PW,
    dialect: 'mysql',
    host: 'localhost',
    operatorAliases: false,
    logging: false
  }
}