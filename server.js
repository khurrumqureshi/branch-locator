var express = require('express'),
    config = require('./config');
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


function configureControllers(app) {
    [
        'branch'
    ].map(function(controllerName) {
            var controller = require('./controllers/' + controllerName);
            return controller.setup(app);
        });
}



