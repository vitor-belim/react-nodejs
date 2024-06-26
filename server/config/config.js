require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: process.env.LOCAL_DB_PASSWORD,
    database: "react-nodejs",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: console.log,
  },
  test: {
    username: "root",
    password: null,
    database: "react-nodejs-test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "react-nodejs-prod",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
