var express = require('express'),
    moment = require('moment'),
    mongoose = require('mongoose'),
    MovieModel = require('../db_service/model/movie'),
    _ = require('underscore'),
    router = express.Router();

mongoose.connect('mongodb://localhost/imooc');
  
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
  var id = req.params.id;
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
