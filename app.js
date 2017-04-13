var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var fetch = require('node-fetch');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var routes = require('./routes/index');

var app = express();
require('lodash-express')(app, 'html');
app.set('view engine', 'html');

// view engine setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/public',express.static(path.join(__dirname, 'public')));

app.use('/', routes);

module.exports = app;
