const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const eventsRoute = require('./routes/eventsRoute.js');

app.use(express.static(__dirname));
//app.use('/', express.static(__dirname));
app.use(bodyParser.urlencoded({parameterLimit:2000000, limit:'200mb', extended:true}));
app.use(bodyParser.json({limit:'200mb'}));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/events", eventsRoute);

module.exports = app;
