/**
 * Module dependencies.
 */

var express   = require('express'),
    http      = require('http'),
    path      = require('path'),
    mongoose  = require('./db'),
    api       = require('./api');

var app = express();

//CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header ('Access-Control-Allow-Origin', '*')
  res.header ('Access-Control-Allow-Credentials', true)
  res.header ('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  res.header ('Access-Control-Allow-Headers', 'Content-Type')
  next();
}

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(allowCrossDomain);
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

api(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
