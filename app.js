const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes');
const newsRouter = require('./routes/news');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/news', newsRouter);

app.use('/error', function (req, res, next) {
    throw new Error('e-r-r-o-r');
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.status = err.status || 500;

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
