var Datastore = require('nedb');

exports.users = new Datastore({
	filename: '../db/users.db',
	autoload: true,
});

exports.exams = new Datastore({
	filename: '../db/exams.db',
	autoload: true
});