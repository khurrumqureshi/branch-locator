var branchManager = require('../lib/branchManager');

exports.setup = function(app) {
    app.get('/api/branch/getList', getBranchList);
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
