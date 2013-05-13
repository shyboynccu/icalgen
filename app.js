
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , events = require('./routes/events')
  , gen = require('./routes/gen')
  , http = require('http')
  , path = require('path')
  , config = require('konphyg')(__dirname + '/config');

var app = express();

// all environments
app.set('port', config('conf').port);
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

app.get('/', routes.index);
app.get('/events/:id', events.byid);
app.post('/api/gen', gen.gen);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
