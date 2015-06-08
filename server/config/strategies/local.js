var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../../db.js');

module.exports = function() {
	passport.use(new LocalStrategy(function(username, password, done){
		db.users.findOne({'email': username}, function(err, doc){
			if(doc && doc.hash == password)
				done(null, doc);
			else
				done(null, false);
		});	
	}));
};