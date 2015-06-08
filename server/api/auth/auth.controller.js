'use strict';

var _ = require('lodash');
var db = require('../../db.js');

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
				if (!err)
					res.status(200).send();
				else
					console.log(err);
			});
	})
};

exports.loginLocal = function(req, res) {
	res.status(200).send(req.user);
};
