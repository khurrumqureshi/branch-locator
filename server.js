var express = require('express'),
    config = require('./config'),
    database = require('./data/database'),
    util = require('./lib/util');
var http = require('http');


/**
 * Process level exception catcher
 */

process.on('uncaughtException', function (err) {
  console.log("Node NOT Exiting...");
  console.log(err.stack);
});

var app = express();
/**
 * Express Configuration
 */
require('./configrations/express-config')(app,express);
configureControllers(app);

/**
 * Start http server here
 */
var server = http.createServer(app);
server.listen(config.main.port);
console.log("Listening on " + config.main.port);

/**
 * Setting socket.io
 */
var io = require('socket.io').listen(server);
io.configure(function () {
    io.set("transports", ["xhr-polling"]);
    io.set("polling duration", 10);
});
io.sockets.on('connection', function (socket) {
    socket.emit('news', database.news[util.getRandomInt(0,5)]);
});

setInterval(function(){
    io.sockets.emit('news', database.news[util.getRandomInt(0,5)] )
},5000);


function configureControllers(app) {
    [
        'branch'
    ].map(function(controllerName) {
            var controller = require('./controllers/' + controllerName);
            return controller.setup(app);
        });
}



