var express = require('express');
var app = express();

var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db = 
process.env.MONGODB_URI || 
process.env.MONGOHQ_URL || 
'mongodb://localhost/auth-intro';

var router = require('./services/router');

mongoose.connect(db, function(err,res){
	if(err){
		console.log("Error connection to: " + db + '. ' + err);
	} else {
		console.log("Succeeded connecting to: " + db);
	}
});

app.use(morgan('combined'));
// app.use(express.static('./client'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ 
	limit: '50mb',
	extended: true, 
	parameterLimit:50000}));
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use('/v1', router);

// router.get('/', (req,res) => {
// 	res.sendFile(path.join(__dirname, './client/index.html'));
// });

// router.get('*', (req,res) => {
//   res.sendFile(path.join(__dirname, './client/index.html'));
// })

var PORT = process.env.PORT || 3000;
var HOST = process.env.HOST || '127.0.0.1';

app.listen(PORT, HOST);