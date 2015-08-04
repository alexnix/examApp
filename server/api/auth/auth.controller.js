'use strict';

var _ = require('lodash');
var db = require('../../db.js');

var api_key = 'key-bce1518d20344bf928f9bde7ee319f5f';
var domain = 'sandboxb97e4d9b715e4a638ab85489cb692e46.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

exports.index = function(req, res) {
  if( req.user )
  	db.users.findOne({_id: req.user._id}, function(err, doc){
  		res.status(200).send(doc);
  	})
  else
  	res.status(401).send();
};

exports.register = function(req, res) {
	db.users.findOne({email: req.body.email}, function(err, doc){
		if(doc)
			res.status(406).send();
		else
			db.users.insert({
				email: req.body.email,
				hash: req.body.hash,
				name: req.body.name,
				exams: [],
				tagline: null,
				rank: null, 
				badges: [],
			}, function(err, doc){
				if (!err){
					mailgun.messages().send({
						from: 'TestBharat <noreply@testbharat.com>',
						to: req.body.email,
						subject: "Wellcome",
						html: 'Hello '+req.body.name +",<br/><br/> Wellcome to TestBharat.com ! Here you can test your skill across various tests and improve your career. Practice and score more !",
					}, function (error, body) {
						if(error) console.log(error); else console.log(body);
						res.status(200).send();
					});
				}
				else
					console.log(err);
			});
	})
};

exports.loginLocal = function(req, res) {
	res.status(200).send(req.user);
};
