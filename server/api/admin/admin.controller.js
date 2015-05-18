'use strict';

var _ = require('lodash');
var db = require('../../db.js');

// Get list of admins
exports.exam = function(req, res) {
  db.exams.insert(req.body);
  res.status(200).send();
};

exports.getExamById = function(req, res){
	db.exams.findOne({_id: req.params.id}, function(err, doc){
		res.status(200).send(doc);
	});
};

exports.updateExam = function(req, res){
	db.exams.update({_id: req.params.id}, req.body, function(err, doc){
		res.status(200).send();
	});
};

exports.deleteExam = function(req, res){
	db.exams.remove({_id: req.params.id}, {}, function(err, doc){
		res.status(200).send();
	});
}
