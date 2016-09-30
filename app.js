var express = require('express');
var app = express();
var volleyball = require('volleyball');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var db = require('./models');
var bluebird = require('bluebird');

// logging middleware
app.use(volleyball);

// body-parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// nunjucks boilerplate
nunjucks.configure('views', { noCache: true });
app.engine('html', nunjucks.render);
app.set('view engine', 'html');

// statically serve public folder
app.use(express.static(__dirname + '/public'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));

// app.get('/', function(req, res, next){
// 	res.render('index');
// });

app.use('/', require('./routes/routes.js'));

// not found middleware
app.use(function(req, res, next){
	var err = new Error('Not Found');
	err.status = 404;
	console.error(err);
	next(err);
});

// error-handling middleware
app.use(function(err, req, res, next){
	res.status(err.status || 500);
	console.error(err);
	res.render('error', {err: err});
});

db.sync()
.then(function(){
	console.log("synched with db");
	app.listen(3000, function(){
		console.log("app is listening on port 3000...")
	});
})
.catch(console.error);