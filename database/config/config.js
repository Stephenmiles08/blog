require('dotenv').config()
module.exports = {
   development : {
      url: `postgres://hackensten:mobile99@localhost:5432/api_dev`,
      dialect: "postgres",
  },
   test : {
      url: process.env.devDatabase,
      dialect: "postgres"
  },
   production : {
     url: process.env.DATABASE_URL,
    dialect: "postgres"
  }
}
