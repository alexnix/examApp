var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var db = require('../../db.js');

var api_key = 'key-bce1518d20344bf928f9bde7ee319f5f';
var domain = 'sandboxb97e4d9b715e4a638ab85489cb692e46.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

module.exports = function(){
	passport.use(new FacebookStrategy({
	    clientID: '278486295658221',
	    clientSecret: '021fcc8903227a6a967d73ff0457ea72',
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
	      		mailgun.messages().send({
					from: 'TestBharat <noreply@testbharat.com>',
					to: profile._json.email,
					subject: "Wellcome",
					html: 'Hello '+ profile.displayName +",<br/><br/> Wellcome to TestBharat.com ! Here you can test your skill across various tests and improve your career. Practice and score more !",
				}, function (error, body) {
					if(error) console.log(error); else console.log(body);
	      			return done(null, user);
				});
	      	});
	      else	
	      	return done(null, user);
	    });
	  }
	));
}