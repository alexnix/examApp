'use strict';

var _ = require('lodash');
var db = require('../../db.js');
var util = require('util');

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
        'questions': exam.questions.length, 
        'duration': exam.duration,
        'category': exam.category,
        'marks': exam.marks,
        'atendees': exam.atendees,
  		});
  	});
  	res.status(200).send(cards);
  });
};

exports.getExam = function(req, res) {
	db.exams.findOne({_id: req.params.id}, function(err, doc){
		doc.questions.forEach(function(question){
			question.options.forEach(function(option){
				option.isCorrect = null;
			});
		});
		res.status(200).send(doc);
	});
}

exports.submitExam = function(req, res, next) {
  db.exams.findOne({_id: req.body._id}, function(err, doc){
    var index = {
      question: -1,
      option: -1,
    };
    var score = 0;
    req.body.results = [];

    // Absolute score
    doc.questions.forEach(function(question){
      var ok = true;
      index.option = -1;
      index.question = index.question + 1;

      question.options.forEach(function(option){
        index.option ++;
        if( req.body.questions[index.question].options[index.option].value === undefined)
          req.body.questions[index.question].options[index.option].value = false;
        if ( option.isCorrect != req.body.questions[index.question].options[index.option].value )
          ok = false;
      });

      if ( ok ) {
        req.body.results.push(true);
        score = score + question.marks;
      } else req.body.results.push(false);
    });

    // Relative score
    req.body.score = score;

    // Save Test
    next();

  });
};

exports.saveExam = function(req, res) {
  db.users.findOne({_id: req.user._id}, function(err, doc){
    var attepts = doc.exams.filter(function(exam){
      return exam._id == req.body._id;
    }).length;

    if( attepts == 0 ) {
      db.users.update({_id: req.user._id}, 
        { $push: { exams: {_id: req.body._id, 
                            name: req.body.name, 
                            score: req.body.score, 
                            total: req.body.marks, 
                            date: new Date().getTime(), 
                            category: req.body.category,
                            questions: req.body.questions.length} 
        } }, 
        function(err, doc){        
          db.exams.update({_id: req.body._id}, {$set: {atendees: req.body.atendees + 1}}, function(err, doc){          
            res.status(200).send({results: req.body.results, score: req.body.score});
          });
      });
    } else res.status(200).send({results: req.body.results, score: req.body.score});
  });
}