'use strict';

var express = require('express');
var controller = require('./admin.controller');

var router = express.Router();

router.post('/exam', controller.exam);
router.put('/exam/:id', controller.updateExam);
router.delete('/exam/:id', controller.deleteExam);
router.get('/exam/:id', controller.getExamById);

module.exports = router;