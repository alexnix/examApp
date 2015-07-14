'use strict';

var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();

var express = require('express');
var controller = require('./upload.controller');

var router = express.Router();

router.get('/', controller.index);

router.post('/profile', multipartyMiddleware, controller.profile);

module.exports = router;