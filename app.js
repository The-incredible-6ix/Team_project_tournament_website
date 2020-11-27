let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

const mongoose = require('mongoose')
const mongoDBUrl = require('./config/mongoDBUrl')
const expressLayout = require('express-ejs-layouts')

//modules for authentication
let session = require('express-session')
let passport = require('passport')
let passportLocal = require('passport-local')
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

//set up mongodb
mongoose.connect(mongoDBUrl.mongodbUrl, {useNewUrlParser: true, useUnifiedTopology: true})

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let matchesRouter = require('./routes/matches');

let app = express();

//set up express session
app.set('trust proxy', 1)
app.use(session({
  secret: 'incredible6',
  cookie: {maxAge: 1000*60*60}, //1h
  resave: true,
  saveUninitialized: false
}))

//initialize flash
app.use(flash());

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//passport user configuration

//create a User Model Instance
let userModel = require('./models/User');
let User = userModel.User;

//implement a User Authentication Strategy
passport.use(User.createStrategy());

//serialize and deserialize the User Info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
app.use('/matches', matchesRouter);

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
