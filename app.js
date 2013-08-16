
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();




// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

// for session begin
app.use(express.cookieParser('1234567890QWERTY'));
app.use(express.session());
// for session end


// == use session in ejs template being ==
// ejs 默认情况下不能在模板中访问session对象。
// 所以在每次render之前先把session对象保存到locals对象，已达到可以再ejs模板中使用session的目的。

app.use(function(req, res, next){

    console.log("req.session:" + req.session);
    res.locals.session = req.session;
    next();

});

// == use session in ejs template end ==

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));





// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}





app.get('/', routes.index);
app.get('/users', user.list);

app.get( '/login', user.gotologin);
app.post("/login", user.login);

app.get('/signup', user.gotosignup);

// ==
// 启动服务器
// ==
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
