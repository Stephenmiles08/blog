require('dotenv').config()
module.exports = {
   development : {
      url: 'postgres://hackensten:mobile99@localhost:5432/api_dev',
      dialect: "postgres",
  },
   test : {
      url: process.env.devDatabase,
      dialect: "postgres"
  },
   production : {
    url: 'postgres://hackensten:4ppywHzJ6Y6mam8rGPgZIfo9lZMYlCwg@dpg-cel14dta4991ihikjleg-a.oregon-postgres.render.com/api_dev_quq5',
    dialectOptions:{
      ssl:{
        rejectUnauthorized: false
      }
    },
    dialect: "postgres"
  }
}
