
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

var taskqueue = require('./util/taskqueue');

var routes = require('./routes');
var project = require('./routes/project');
var hooks = require('./routes/hooks');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// 404 next required
app.use(function (req, res, next) {
    res.render('404', { title: '404', url: req.url, err: "404" });
});

// 500 next required
app.use(function (err, req, res, next) {
    res.render('500', { title: '500', url: req.url, err: err });
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/project/:ns/:project/:title.html', project.html);
app.get('/project/:ns/:project/:title', project.blogs);
app.post('/project',project.add);
app.put('/project',project.update);

app.post('/hooks/doc',hooks.pullDoc);
app.post('/hooks/proto',hooks.pullProto);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

taskqueue.start();