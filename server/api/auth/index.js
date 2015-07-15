'use strict';

var express = require('express');
var controller = require('./auth.controller');

var passport = require('passport');
require('../../config/passport.js')();

var router = express.Router();

router.get('/', controller.index);
// Login local
router.post('/local/register', controller.register);
router.post('/local/login', passport.authenticate('local'), controller.loginLocal);

router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/', scope: ['email'] }));

router.get('/twitter', passport.authenticate('twitter'));
router.get('/twitter/callback', passport.authenticate('twitter',{ successRedirect: '/', failureRedirect: '/'}));

router.get('/logout', function(req, res){
	req.logout();
	res.status(200).send();
})

module.exports = router;