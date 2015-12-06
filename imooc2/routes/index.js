var express = require('express'),
    moment = require('moment'),
    mongoose = require('mongoose'),
    MovieModel = require('../db_service/model/movie'),
    _ = require('underscore'),
    router = express.Router();

mongoose.connect('mongodb://localhost:27017/imooc');
    
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
  var movieObj = req.body, 
      id = movieObj.movieId,
      _movie;
  if(id !== ''){
    MovieModel.findById(id, function(err, movie){
      if (err) {
        console.log(err);
      };
      _movie = _.extend(movie, movieObj);
      _movie.save(function(err, movie){
        if (err) {
          console.log(err);
        };
        res.redirect('/movie/'+movie._id);
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
      console.log(movie);
      res.redirect('/movie/'+movie._id);
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
  
router.post('/admin/movie/delete', function(req, res){
  var id = req.body.id;
  if (id) {
    MovieModel.removeById(id, function(err, movie){
      if (err) {
        console.log(err);
      };
      res.json({success : 1});
    });
  }
});

router.get('/admin/list', function(req, res) {
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
