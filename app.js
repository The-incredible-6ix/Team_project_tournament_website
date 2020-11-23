var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const mongoose = require('mongoose')
const mongoDBUrl = require('./config/mongoDBUrl')
const expressLayout = require('express-ejs-layouts')

//set up mongodb
mongoose.connect(mongoDBUrl.mongodbUrl, {useNewUrlParser: true, useUnifiedTopology: true})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//set up session
app.set('trust proxy', 1)
app.use(session({
  secret: 'incrediable6',
  cookie: {maxAge: 1000*60*60}, //1h
  resave: false,
  saveUninitialized: true
}))

//set up ejs layouts
// app.set('layout', './layouts/layout1')

// view engine setup
app.set('view engine', 'ejs');

//open folder
app.use('/public', express.static(__dirname+ '/public'))

// app.use(expressLayout)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.render('error');
});

app.listen(3000, ()=>{
  console.log('server running...')
})

module.exports = app;
