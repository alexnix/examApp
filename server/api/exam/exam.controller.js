'use strict';

var _ = require('lodash');
var db = require('../../db.js');

// Get list of exams
exports.index = function(req, res) {
  db.exams.find({}, function(err, doc){
  	var cards = [];
  	doc.forEach(function(exam){
  		cards.push({
  			'_id': exam._id,
  			'name': exam.name,
  			'description': exam.description,
  			'tags': exam.tags,
  		});
  	});
  	res.status(200).send(cards);
  });
};

exports.getExamById = function(req, res) {
	db.exams.findOne({_id: req.params.id}, function(err, doc){
		doc.questions.forEach(function(question){
			question.options.forEach(function(option){
				option.isCorrect = null;
			});
		});
		res.status(200).send(doc);
	});
}