var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
	title    : String,
	director : String,
	language : String,
	country  : String,
	year     : Number,
	flash    : String,
	picurl   : String,
	summary  : String,
	meta     : {
		createdAt : {
			type    : Date,
			default : Date.now(), 
		},
		updateAt : {
			type    : Date,
			default : Date.now(), 
		}
	}
});

MovieSchema.pre('save', function(next){
	if (this.isNew) {
		this.meta.createdAt = this.meta.updateAt = Date.now();
	} else{
		this.meta.updateAt = Date.now();
	};
	next && nex();
});

MovieSchema.statics = {
	fetch : function(callback){
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(callback);
	},
	findById : function(id, callback){
		return this
			.findOne({id : id})
			.exec(callback);
	}
};

module.exports = MovieSchema;