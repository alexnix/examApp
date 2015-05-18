'use strict';

var express = require('express');
var controller = require('./exam.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/get/:id', controller.getExamById);

module.exports = router;