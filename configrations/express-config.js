 var config = config = require('./../config');

module.exports = function(app,express){
    app.configure(function() {
        app.use(express.logger('dev'));
        app.use(express.compress());
        app.use(express.methodOverride());
        app.use(express.cookieParser());
        app.use(express.bodyParser());
        app.use(app.router);
        app.use(express.static(config.projectDirectory + '/public'));
    });

    app.configure('development', function() {
        app.use(express.errorHandler({
            dumpExceptions: true,
            showStack: true
        }));
    });
    app.configure('production', function() {
        app.use(express.errorHandler());
    });

    // Setup Express error handler middleware!
    app.use(function(err, req, res, next){
        res.send(500, {error:err.toString()});
    });
}


