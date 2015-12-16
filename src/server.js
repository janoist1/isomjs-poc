'use strict';

var express = require('express'),
    app = require('./middleware/app'),
    logger = require('./middleware/app'),
    server = module.exports.server = exports.server = express();

// setup server stuff
server.set('port', process.env.PORT || 8000);

// hook up middlewares
server.use(express.static(__dirname + '/../public'));
server.use(logger);
server.use(app);

// start server
var httpServer = server.listen(server.get('port'), function () {
    var host = httpServer.address().address;
    var port = httpServer.address().port;

    console.log('App Server is listening at http://%s:%s', host, port);
});
