const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config');
const cors = require('cors');
const session = require('express-session');

const newsRouter = require('./routes/news');
const userRouter = require('./routes/user');

mongoose.connect(config.databaseUri, { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connection successful');
});

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'fcmp-2018', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

require('./config/passport');

app.use('/user', userRouter);
app.use('/news', newsRouter);

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: err,
    },
  });
});

module.exports = app;
