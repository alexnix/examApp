var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var db = require('../../db.js');

module.exports = function(){

	passport.use(new TwitterStrategy({
    consumerKey: 'CsA7mo5L0vsTAhPYNpYtjYvTn',
    consumerSecret: 'a0yiGrMNmOUfaMYNsPvxD3AAHZgrTa2XRQmR12bTNN9EuAIvhL',
    callbackURL: "/api/auth/twitter/callback"
  },
	  function(token, tokenSecret, profile, done) {

	  	//console.log(profile);
	    db.users.findOne({ twitterId: profile.id }, function (err, user) {
		      if( user == null )
		      	db.users.insert({twitterId: profile.id, 
		      					name: profile.displayName, 
		      					email: null,
		      					exams: [],
								tagline: null,
								rank: null, 
								badges: [],
		      					}, 
		      	function(err, user){
		      		return done(null, user);
		      	});
		      else	
		      	return done(null, user);
		    });

	  }
	));
}