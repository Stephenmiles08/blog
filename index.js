const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const express = require('express');
const port = process.env.port;
const app = express()

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

require('./routes')(app)

app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
})