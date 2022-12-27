const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const express = require('express');
const port = process.env.port;
const app = express()
const routes = [require('./routes/api/auth'), require('./routes/api/comment'), require('./routes/api/like'), require('./routes/api/post'), ]

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use('/api',routes);


app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
})