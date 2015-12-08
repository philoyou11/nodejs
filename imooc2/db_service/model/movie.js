var mongoose = require('mongoose'),
	MovieSchema = require('../schema/movie');

var MovieModel = mongoose.model( 'movies', MovieSchema);

module.exports = MovieModel;