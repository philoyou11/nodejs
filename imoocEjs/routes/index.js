var express = require('express'),
    moment = require('moment'),
    mongoose = require('mongoose'),
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
      .findOne({_id : id})
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
      title    : '',
      director : '',
      language : '',
      country  : '',
      year     : '',
      summary  : '',
      flash    : '',
      picurl   : '',
    },
  });
});

router.post('/admin/movie/new', function(req, res){
  var id = req.body.movieId,
      _movie;
  if(id !== ''){
    MovieModel.findById(id, function(err, movie){
      if (err) {
        console.log(err);
      };
      _movie = movie;
      _movie.save(function(err, _movie){
        if (err) {
          console.log(err);
        };
        res.redirect('/movie/'+_movie.id);
      });
    });
  }else{
    _movie = new MovieModel({
      title    : req.body.title,
      director : req.body.director,
      language : req.body.language,
      country  : req.body.country,
      year     : req.body.year,
      summary  : req.body.summary,
      flash    : req.body.flash,
      picurl   : req.body.picurl,
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
  var id = req.params.id;
  if (id) {
    MovieModel.findById(id, function(err, movie){
      if (err) {
        console.log(err);
      };
      res.render('admin', {
        title : movie.title + '更新页',
        des   : movie.title + '更新页',
        movie : movie
      });
    });
  }
});

router.get('/list', function(req, res) {
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
});


router.get('/movie/:id', function(req, res, next) {
  var id = req.params.id;
  MovieModel.findById(id, function(err, movie){
    if (err) {
      console.log(err);
    };
    res.render('detail', { 
      title : 'detail-' + movie.title,
      des   : 'detail page',
      movie : movie
    });
  });
});

module.exports = router;
