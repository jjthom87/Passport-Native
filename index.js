var express = require('express');
var app = express();

var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var router = require('./services/router');

if (process.env.NODE_ENV == 'production'){
	mongoose.connect(process.env.MONGO_URL)
} else {
	mongoose.connect('mongodb://jjthom87:Ntho1mas@ds157740.mlab.com:57740/auth-intro')
}

app.use(morgan('combined'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use('/v1', router);

var PORT = process.env.PORT || 3000;

app.listen(PORT);