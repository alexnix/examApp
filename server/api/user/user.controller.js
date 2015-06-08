'use strict';

var _ = require('lodash');
var db = require('../../db.js');

// Get list of users
exports.index = function(req, res) {
  res.json([]);
};

exports.update = function(req, res) {
	db.users.update({_id: req.user._id}, {$set:{ age: req.body.age, tagline: req.body.tagline }}, function(err, doc){
		if ( !err )
			res.status(200).send();
	})
};

exports.getUser = function(req, res) {
	db.users.findOne({_id: req.params.id}, function(err, doc){
		if ( !err )
			res.status(200).send(doc);
	});
};