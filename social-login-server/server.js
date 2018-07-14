var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var User = require('./api/models/userModel');
var SocialLoginHistory = require('./api/models/socialLoginHistoryModel');
var cors = require('cors');

var app = express();

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/node-passport-social', { useMongoClient: true })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 's3cr3t',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

var auth = require('./api/routes/auth');
app.use('/auth', auth);

var routes = require('./api/routes/router');
routes(app);


module.exports = app;
