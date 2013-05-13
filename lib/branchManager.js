var data = require('../data/database');
var async = require('async');
var config = require('../config');

module.exports.getBranchList = function(lat,long,dist,callback){
    getBranches(lat,long,dist,function(err,branches){
        if(branches.length>0){
            callback(null,branches);
        }
        else{
            getBranches(config.defaultLocation.lat,config.defaultLocation.long,100,function(err,branches){
                callback(null,branches);
            });
        }
    })
}

function getBranches(lat,long,dist,callback){
    var branches=[]
    async.forEach(data.database.branches,function(bracnh,cb){
        var difference = getDistanceFromLatLonInKm(lat,long,bracnh.location.lat,bracnh.location.long);
        if(dist>=difference){
            branches.push(bracnh);
        }
        cb();
    },function(err){
        callback(null,branches)
    })
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                    Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}
