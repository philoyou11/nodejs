var mongoose = require('mongoose'),
	 UserSchema = require('../schema/user');

var UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;	 