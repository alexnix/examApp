'use strict';

var express = require('express');
var controller = require('./exam.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/get/:id', controller.getExam);
router.post('/submit', controller.submitExam, controller.saveExam);

module.exports = router;