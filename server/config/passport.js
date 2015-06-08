var passport = require('passport');

module.exports = function() {
	passport.serializeUser(function(user, done){
		done(null, user);
	});

	passport.deserializeUser(function(id, done){
		done(null, id);
	});

	require('./strategies/local.js')();
	require('./strategies/facebook.js')();
	require('./strategies/twitter.js')();
}