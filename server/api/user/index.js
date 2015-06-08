'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/', controller.index);
router.post("/update", controller.update);
router.get('/get/:id', controller.getUser);


module.exports = router;