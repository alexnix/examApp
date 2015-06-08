var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var db = require('../../db.js');

module.exports = function(){
	passport.use(new FacebookStrategy({
	    clientID: '780374538721879',
	    clientSecret: '672b125b8810b9f49f0ed46b12ce2a2d',
	    callbackURL: "/api/auth/facebook/callback",
	    enableProof: true,
	    scope: ['email'],
	  },
	  function(accessToken, refreshToken, profile, done) {
	    //console.log(profile);
	    db.users.findOne({ facebookId: profile.id }, function (err, user) {
	      if( user == null )
	      	db.users.insert({facebookId: profile.id, 
	      					name: profile.displayName, 
	      					email: profile._json.email,
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