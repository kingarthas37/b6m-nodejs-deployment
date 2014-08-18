var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

var pkg = require('./package.json');

//初始化cms-api
var api = require('local-cms-api');
api.config(pkg.api,pkg.cache);


//设置模板引擎为handlebars
var hbs = require('express-hbs');
app.engine('html',hbs.express3({
    partialsDir : __dirname + "/views/partials",
    defaultLayout : __dirname + "/views/layouts/default",
    layoutsDir : __dirname + "/views/layouts",
    extname:".html"
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('x-powered-by',false);


//设置资源路径
var resourceBaseUrl = '';
var env =app.get('env');
 if(env === 'prod') {
    app.locals.IS_PROD = true;
    resourceBaseUrl = "http://staticcdn.b5m.com/proj/" + pkg.name;
}
app.locals.RESOURCE_BASE_URL = resourceBaseUrl;
app.locals.ASSETS_MAP= require('./public/build/map.json');

//获取并设置版本号
var Cache = require('local-cache');
var cache = new Cache('10.10.100.15','11311');
cache.nget('_pre_version',function(err,data){
    if(err) {
        throw err;
    }
    if(data) {
        var y = new Date().getFullYear();
        app.locals.VERSION = y + "" + data;
    }else {
        app.locals.VERSION = new Date().getTime();
    }
});

app.use(favicon());
app.use(favicon(path.join(__dirname,'/public/build/images/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public/build')));


//设置debug调试( b5m.com?debug=true )为调试状态
app.use(function(req,res,next){
    app.locals.IS_DEBUG = req.query.debug;
    next();
});


//routes
var routes = require('./routes/entry');
var util = require('util');
if(routes) {
    for(var k in routes){
        app.use(k,routes[k]);
    }
}else {
    app.use(function(req,res,next){
        res.send('<h1>hello world</h1>');
        next();
    });
}

/// 捕获404错误并转到错误处理
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/// 错误处理

// 开发和stage环境错误处理
// 会输出stacktraces
if (app.get('env') === 'development' || app.get('env') === 'stage') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// 生产环境错误处理
// 不会输出stacktraces
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//注册handles的helper
require('./lib/hbs-helper');

module.exports = app;
