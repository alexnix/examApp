'use strict';

var express = require('express');
var controller = require('./exam.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/get/:id', controller.fromSession, controller.getExam);
router.post('/session', controller.updateSession);
router.post('/submit', controller.submitExam, controller.saveExam);

router.get('/getQuestion/:quiz/:question', controller.getQuestion);
router.get('/getQuestions/', controller.getQuestionsCorrect);

router.get('/summary/:user/:exam', controller.getSummary);

module.exports = router;