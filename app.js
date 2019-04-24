const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config');
const cors = require('cors');

const newsRouter = require('./routes/news');

mongoose.connect(config.databaseUri, { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connection successful');
});

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/news', newsRouter);

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.status = err.status || 500;

    res.status(err.status || 500);
});

module.exports = app;
