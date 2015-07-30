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

exports.fromSession = function(req, res, next) {
  db.sessions.findOne({user_id: req.user._id, exam_id: req.params.id}, function(err, doc){
    if ( doc ){
      console.log("!!!!");
      res.status(200).send(doc.exam);
    }
    else
      next();
  });
};

exports.updateSession = function(req, res) {
  req.body.exam.duration = req.body.duration;
  db.sessions.update({user_id:req.user._id, exam_id:req.body.exam._id}, {$set: {exam:req.body.exam}}, function(err, doc){
    res.status(200).send();
  });
};

exports.getExam = function(req, res) {
	db.exams.findOne({_id: req.params.id}, function(err, doc){
		doc.questions.forEach(function(question){
      var cont = 0;
			question.options.forEach(function(option){
        if( option.isCorrect )
				  cont++;
        option.isCorrect = null;
			});
      if( cont == 1 )
        question.singleAnswer = true;
		});

    var timeout = setTimeout(function() {
      db.sessions.findOne({user_id: req.user._id, exam_id: doc._id}, function(err, doc){
        if(doc)timer_cb({body:doc.exam, user:{_id:doc.user_id}});
      });
    }, doc.duration*1000);
 
    db.sessions.insert({user_id:req.user._id, exam_id:doc._id, exam: doc, timeout: null});

		res.status(200).send(doc);
	});
};

exports.submitExam = function(req, res, next) {
  db.sessions.remove({user_id: req.user._id, exam_id: req.body._id},{},function(err, num){
    if(!err)
      console.log(num);
    else
      console.log(err);
  });

  db.exams.findOne({_id: req.body._id}, function(err, doc){
    var index = {
      question: -1,
      option: -1,
    };
    var score = 0;
    req.body.results = [];

    // Absolute score
    doc.questions.forEach(function(question){
      var ok = true, wasCheckd = false;
      index.option = -1;
      index.question = index.question + 1;
      req.body.results[index.question] = [];

      if( !req.body.questions[index.question].singleAnswer ){
        question.options.forEach(function(option){
          index.option ++;
          if( req.body.questions[index.question].options[index.option].value === undefined)
            req.body.questions[index.question].options[index.option].value = false;
          if( req.body.questions[index.question].options[index.option].value )
            wasCheckd = true;
          if ( option.isCorrect != req.body.questions[index.question].options[index.option].value )
            ok = false;

          if( option.isCorrect )
            req.body.results[index.question].push(option);
        });
      } else {
        question.options.forEach(function(option){
          if ( option.isCorrect )
            if( option.text != req.body.questions[index.question].ans ){
              ok = false;
              req.body.results[index.question].push(option);
            }
        });
      }

      if ( ok ) {
        req.body.results[index.question] = true;
        score = score + question.marks;
      } else {
        if( req.body.questions[index.question].ans || wasCheckd)
          score = score - question.marks_negative;
      }
    });

    // Relative score
    req.body.score = score;

    // Save Test
    next();

  });
};

exports.saveExam = function(req, res) {
  db.users.findOne({_id: req.user._id}, function(err, doc){
    // verifica daca a mai dat examenul
    var attepts = doc.exams.filter(function(exam){
      return exam._id == req.body._id;
    }).length;

    // daca nu l-a mai dat il saveaza
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
            if(res) res.status(200).send({results: req.body.results, score: req.body.score}); // trimite inapoi vectorul cu rezultate si scorul realativ
          });
      });
    } else if(res) res.status(200).send({results: req.body.results, score: req.body.score}); // trimite inapoi vectorul cu rezultate si scorul realativ
  });
};

exports.getQuestion = function(req, resp){
  var q;
  db.exams.findOne({_id: req.params.quiz}, function(err, doc){
    doc.questions.forEach(function(question){
      if( question.id == req.params.question )
        q = question;
    });
    q.examName = doc.name;
    resp.status(200).send(q);
  });
};

exports.getQuestionsCorrect = function(req, resp){
  var q;
  db.exams.findOne({_id: req.params.quiz}, function(err, doc){
    doc.questions.forEach(function(question){
      if( question.id == req.params.question )
        q = question.data;
    });
    q.examName = doc.name;
    resp.status(200).send(q);
  });
};


function timer_cb(req) {
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
      req.body.results[index.question] = [];

      if( !req.body.questions[index.question].singleAnswer ){
        question.options.forEach(function(option){
          index.option ++;
          if( req.body.questions[index.question].options[index.option].value === undefined)
            req.body.questions[index.question].options[index.option].value = false;
          if ( option.isCorrect != req.body.questions[index.question].options[index.option].value )
            ok = false;

          if( option.isCorrect )
            req.body.results[index.question].push(option);
        });
      } else {
        question.options.forEach(function(option){
          if ( option.isCorrect )
            if( option.text != req.body.questions[index.question].ans ){
              ok = false;
              req.body.results[index.question].push(option);
            }
        });
      }

      if ( ok ) {
        req.body.results[index.question] = true;
        score = score + question.marks;
      } else {
        score = score - question.marks_negative;
      }
    });

    // Relative score
    req.body.score = score;

    // Save Test
    db.users.findOne({_id: req.user._id}, function(err, doc){
      // verifica daca a mai dat examenul
      var attepts = doc.exams.filter(function(exam){
        return exam._id == req.body._id;
      }).length;

      // daca nu l-a mai dat il saveaza
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
              
            });
        });
      } 
    });

  });
}