'use strict';

var express = require('express');
var controller = require('./exam.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/get/:id', controller.getExam);
router.post('/submit', controller.submitExam, controller.saveExam);

router.get('/getQuestion/:quiz/:question', controller.getQuestion);
router.get('/getQuestions/', controller.getQuestionsCorrect);

module.exports = router;