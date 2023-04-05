const express = require('express');
const { initializeDatabase } = require('../config/database');
const router = require('./router');
const cors = require('cors');
const app = express();
const port = process.env.port || 3030;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

initializeDatabase()
    .then(() => {
        console.log(">>>>> Database connected successfully! <<<<<");
        app.listen(port, () => console.log(`>> * Server is working at: http://localhost:${port} * <<`));
    })
    .catch(err => {
        console.log('>>>>> Database connection error <<<<<');
        console.log('Error: ' + err.message);
    });