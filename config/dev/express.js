var express = require('express');
var http = require('http')
var config = require('./config');

var app = express();

app.use(express.static('dist'));

var server = http.createServer(app).listen(config.express.port, function() {
    console.log('Running server at http://%s:%s', config.express.host, config.express.port);
});