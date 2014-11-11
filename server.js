var express = require('express');
	app = express(),
	sql = require('sequelize'),
	port = 8500,
	env = require('./env');

var sequelize = new sql(env.dbName, env.dbUser, env.dbPass, {
	host: env.dbHost
});

var Lawyer = sequelize.define('Lawyer', {
  name: {type: sql.STRING, allowNull: false},
  location: {type: sql.STRING, allowNull: false},
  record: {type: sql.INTEGER, defaultValue: 0},
  hourly_rate: {type: sql.DECIMAL(2), defaultValue: 0}     
}, {comment: 'Table to store lawyers'});

sequelize.sync().then(function() {
  console.log('Database synced');
}, function(error) {
  console.error(error);
});

app.get('/lawyers', function(req, res){
	Lawyer.all().then(function(lawyers) {
 		res.send(lawyers);
	}, function(err){
		console.error(err);
	});
});


app.listen(port, function(){
	console.log('Server started on ' + port);
});



