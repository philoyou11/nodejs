var express = require('express'),
    router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title  : 'Index',
  	des    : 'index page',
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
  });
});

router.get('/admin', function(req, res, next) {
  res.render('admin', { 
  	title : 'admin',
  	des   : 'admin page',
    movie : {

    },
  });
});

router.get('/list', function(req, res, next) {
  res.render('list', { 
  	title : 'list',
  	des   : 'list page',
  });
});

router.get('/movie/:id', function(req, res, next) {
  res.render('detail', { 
  	title : 'detail',
  	des   : 'detail page',
    movie : {
      flash    : 'http://www.w3school.com.cn/i/movie.ogg',
      title    : '终结者',
      director : 'James',
      country  : 'USA',
      language : 'English',
      year     : 2001,
      summary  : '在一次人类登陆火星的任务中，宇航员马克·沃特尼（马特·达蒙 Matt Damon 饰）经历了一场恶劣的风暴后，与他的机组成员失联，所有人都认为他在这次任务中丧生。然而，马克却幸运地活了下来，然而他发现自己孤单地置身于异星球。面对贫乏的生命补给，马克必须用他的聪明才智和顽强的精神存活下来，并找寻向地球发出“他还活着”求救信号的方法，而地球上的人也面临着是否前往火星去拯救他的分歧。 '
    },
  });
});

module.exports = router;
