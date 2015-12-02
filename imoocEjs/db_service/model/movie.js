var mongoose = require('mongoose'),
	 MovieSchema = require('../schema/movie');

var Movie = mongoose.Model(
	'Movie', 
	MovieSchema
);

mmodule.exports = Movie;