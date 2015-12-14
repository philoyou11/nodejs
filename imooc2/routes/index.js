var express = require('express'),
    moment = require('moment'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    MovieModel = require('../db_service/model/movie'),
    UserModel = require('../db_service/model/user'),
    _ = require('underscore'),
    router = express.Router();

mongoose.connect('mongodb://localhost:27017/imooc');

/* 用户注册 */
router.post('/user/regist', function(req, res){
  var _user = req.body;
  UserModel.find({name : _user.name}, function(err, user){
    if (err) {
        console.log(err);
    };
    if(user){
        return res.redirect('/');
    }else{
        var user = new UserModel(_user);
        user.save(function(err, user){
        if (err) {
          console.log(err);
        };
        res.redirect('/user/list');
      });
    }
  });        
});

/* 用户列表 */
router.get('/user/list', function(req, res){
  UserModel.fetch(function(err, users){
    if (err) {
      console.log(err);
    };
    res.render('userlist', {
      title  : 'User list',
      des    : 'User list page', 
      moment : moment,
      users  : users 
    });
  });
});

/* 首页 */
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

/* 添加电影字段页 */
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

/* 添加新的电影 */
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
      res.redirect('/movie/'+movie._id);
    });
  }    
});

/* 更新电影 */
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

/* 删除电影 */  
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

/* 电影编辑列表页 */
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

/* 电影详情页 */
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
