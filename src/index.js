const express = require('express');
const { initializeDatabase } = require('../config/database');
const router = require('./router');
const cors = require('cors');
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: false }));
app.use(router);

initializeDatabase()
    .then(() => {
        console.log(">>>>> Database connected successfully! <<<<<");
        app.listen(port);
    })
    .catch(err => {
        console.log('>>>>> Database connection error <<<<<');
        console.log('Error: ' + err.message);
    });