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
      /*
      movies : [
        {
          id      : 100,
          picurl  : "/images/jewel.jpg",
          title   : "终结者",
        },
        {
          id      : 100,
          picurl  : "/images/jewel.jpg",
          title   : "终结者",
        },
        {
          id      : 100,
          picurl  : "/images/jewel.jpg",
          title   : "终结者",
        },
        {
          id      : 100,
          picurl  : "/images/jewel.jpg",
          title   : "终结者",
        },
        {
          id      : 100,
          picurl  : "/images/jewel.jpg",
          title   : "终结者",
        },
        {
          id      : 100,
          picurl  : "/images/jewel.jpg",
          title   : "终结者",
        },
        {
          id      : 100,
          picurl  : "/images/jewel.jpg",
          title   : "终结者",
        },
        {
          id      : 100,
          picurl  : "/images/jewel.jpg",
          title   : "终结者",
        },
      ],
      */
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
      id = movieObj.id,
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
      /*
      movie : {
        flash    : 'http://www.w3school.com.cn/i/movie.ogg',
        title    : '终结者',
        director : 'James',
        country  : 'USA',
        language : 'English',
        year     : 2001,
        summary  : '在一次人类登陆火星的任务中，宇航员马克·沃特尼（马特·达蒙 Matt Damon 饰）经历了一场恶劣的风暴后，与他的机组成员失联，所有人都认为他在这次任务中丧生。然而，马克却幸运地活了下来，然而他发现自己孤单地置身于异星球。面对贫乏的生命补给，马克必须用他的聪明才智和顽强的精神存活下来，并找寻向地球发出“他还活着”求救信号的方法，而地球上的人也面临着是否前往火星去拯救他的分歧。 '
      },
      */
    });
  });
});

module.exports = router;
