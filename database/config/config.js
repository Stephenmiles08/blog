require('dotenv').config()
module.exports = {
   development : {
      url: process.env.devDatabase,
      dialect: "postgres",
  },
   test : {
      url: process.env.devDatabase,
      dialect: "postgres"
  },
   production : {
    url: process.env.DATABASE_URL,
    dialectOptions:{
      ssl:{
        rejectUnauthorized: false
      }
    },
    dialect: "postgres"
  }
}
