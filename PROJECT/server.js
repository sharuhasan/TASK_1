"use strict";
exports.__esModule = true;
var mongoose = require('mongoose');
var express = require('express');
var config = require('config');
var app = express();
var morgan = require('morgan');
//Body parser middleware
app.use(express.json());
app.use(morgan('dev'));
//DB config
var db = config.get('mongouri');
//connect to mongo DB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(function () { return console.log('mongo connected..'); })["catch"](function (err) { console.log(err); });
app.use('/api', require('./routes/shaastra'));
var port = process.env.PORT || 5000;
app.listen(port, function () { return console.log("server started on port " + port); });
