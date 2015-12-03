var express = require('express'),
    moment = require('moment'),
    mongoose = require('mongoose'),
    _ = require('underscore'),
    router = express.Router();

var db = mongoose.connect('mongodb://localhost:27017/imooc');

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
      default : Date.now()
    },
    updateAt : {
      type    : Date,
      default : Date.now()
    }
  }
});

MovieSchema.pre('save', function(next){
  if (this.isNew) {
    this.meta.createdAt = this.meta.updateAt = Date.now();
  } else{
    this.meta.updateAt = Date.now();
  };
  next && next();
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

var MovieModel = db.model( 'Movies', MovieSchema);

    
/* GET home page. */
router.get('/', function(req, res, next) {
  MovieModel.fetch(function(err, movies){
    if (err) {
      console.log(err);
    }
    res.render('index', { 
      title  : 'Index',
      des    : 'index page',
      movies : movies
    });
  });
});

router.get('/admin/movie', function(req, res, next) {
  res.render('admin', { 
  	title : 'admin',
  	des   : 'admin page',
    movie : {
      
    },
  });
});

router.post('/admin/movie/new', function(req, res){
  var movieObj = req.body.movie,
      id = movieObj._id,
      _movie;
  if(id !== 'undefined'){
    MovieModel.findById(id, function(err, movie){
      if (err) {
        console.log(err);
      };
      _movie = _.extend(movie, movieObj);
      _movie.save(function(err, movie){
        if (err) {
          console.log(err);
        };
        res.redirect('/movie/'+movie.id);
      });
    });
  }else{
    _movie = new MovieModel({
      title    : movieObj.title,
      director : movieObj.director,
      language : movieObj.language,
      country  : movieObj.country,
      year     : movieObj.year,
      summary  : movieObj.summary,
      flash    : movieObj.flash,
      picurl   : movieObj.picurl,
    });
    _movie.save(function(err, movie){
      if (err) {
          console.log(err);
        };
        res.redirect('/movie/'+movie.id);
    });
  }    
});

router.get('/admin/movie/update/:id', function(req, res){
  var id = req.body.id;
  if (id) {
    MovieModel.findById(id, function(err, movie){
      res.render('/admin/movie', {
        title : movie.title + '更新页',
        movie : movie
      });
    });
  }
});

router.get('/list', function(req, res, next) {
  MovieModel.fetch(function(err, movies){
    if (err) {
      console.log(err);
    }
    res.render('list', { 
      title  : 'list',
      des    : 'list page',
      moment : moment,
      movies : movies
    });
  });
  next && next();
});


router.get('/movie/:id', function(req, res, next) {
  var id = req.params._id;
  MovieModel.findById(id, function(err, movie){
    if (err) {
      console.log(err);
    };
    res.render('detail', { 
      title : 'detail' + movie.title,
      des   : 'detail page',
      movie : movie
    });
  });
});

module.exports = router;
