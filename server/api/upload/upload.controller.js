'use strict';

var _ = require('lodash');
var db = require('../../db.js');

// Get list of uploads
exports.index = function(req, res) {
  res.json([]);
};

exports.profile = function(req, res) {
	var fs = require('fs');
	console.log(req.files);
	var file = req.files.file;
    var filename = req.user._id + ".png";
    var newPath = 'client/assets/uploads/' + filename;

    fs.rename(file.path,  newPath, function(err){
    	if(err){
    		console.log(err);
    		res.status(400).send();
    	}
    	else{
    		db.users.update({_id: req.user._id}, {$set: {"avatar": filename}});
    		res.status(200).send();
    	}
    });
	
};