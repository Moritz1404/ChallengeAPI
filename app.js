require('dotenv').config();

const express = require('express');
const app = express(); //start express
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const challangeRoute = require('./api/routes/challange');
const userRoute = require('./api/routes/user');

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
//mongoose.set('useNewURLParser', true);

const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL)
    .catch(err => {
        console.error("App starting error: ", err.message);
        process.exit(1);
    });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false})); //TODO use new way
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'Options') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


app.use('/challange', challangeRoute);
app.use('/challange/user', userRoute);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
