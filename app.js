var express = require('express'),
	mongoose = require('mongoose')
, http = require('http');

var app = express();

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + "/public"));
});

mongoose.connect("mongodb://localhost/helloExpress");

var UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	age: Number
}),

	Users = mongoose.model('Users', UserSchema);
// INDEX	
app.get("/users", function (req, res) {
	Users.find({}, function (err, docs) {
		res.render('users/index', { users: docs });
	});
});

//NEW
app.get('/users/new', function (req, res) {
	res.render("users/new");
});

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});














