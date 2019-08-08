global.__base = __dirname + '/'; // set base directory

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// database related shit
const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('./knexfile');

// authentication related stuff
var passportInit = require('./config/passport')

// Routes
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

// Set up database stuff
const knex = Knex(knexConfig.development);
Model.knex(knex);

const app = express(); //create express server

// helper middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

passportInit(app);

// Routes
app.use('/', indexRouter);
app.use('/user', userRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

module.exports = app;
