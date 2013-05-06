var branchManager = require('../lib/branchManager'),
    fs = require('fs'),
    config = require('../config');

exports.setup = function(app) {
    app.get('/api/branch/getList', getBranchList);
    app.get('/api/branch/image/:imageName', getBranchImage);
}

/**
 * GET /api/branch/getList??lon=122.123123&lat=-37.34234&dist=10000
 */
function getBranchList(req, res, next) {
    if(!req.query.lon || !req.query.lat || !req.query.dist)
        return next(new Error("Param required."));

    branchManager.getBranchList(req.query.lat,req.query.lon,req.query.dist,function(err,result){
        res.send(result);
    })
}

/**
 * /api/branch/image/:imageName
 */
function getBranchImage(req, res, next) {
    if(req.params.imageName){
        fs.readFile(config.projectDirectory+"/public/images/"+req.params.imageName,function(err,data){
            if (err)
                next(err);
            else{
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write('<html><body><img src="data:image/jpeg;base64,')
                res.write(new Buffer(data).toString('base64'));
                res.end('"/></body></html>');
            }
        })
    }
    else{
        next(new Error("Request does not contains data params"));
    }

}
