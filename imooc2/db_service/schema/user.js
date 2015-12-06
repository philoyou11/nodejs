var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
  name : {
    type   : String,
    unique : true
  },
  password : String,
  meta     : {
    createdAt : {
      type    : Date,
      default : Date.now()
    },
    updateAt : {
      type    : Date,
      default : Date.now()
    }
  }
});

UserSchema.pre('save', function(next){
  var user = this;
  if (this.isNew) {
    this.meta.createdAt = this.meta.updateAt = Date.now();
  } else{
    this.meta.updateAt = Date.now();
  };
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
    if (err) {
      next && next(err);    
    };
    bcrypt.hash(user.password, salt, function(err, hash){
      if (err) {
        next && next(err);    
      };
      user.password = hash;  
      next && next(err);
    });
  });
});

UserSchema.statics = {
  fetch : function(callback){
    return this.find({}).sort('meta.updateAt').exec(callback);
  },
  findById : function(id, callback){
    return this.findOne({_id : id}).exec(callback);
  },
  removeById : function(id, callback){
    this.remove({_id : id}).exec(callback);
  }
};

module.exports = UserSchema;