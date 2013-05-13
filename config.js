/**
 * API configs
 * 
 */
 
 module.exports.main = {
     port: process.env.PORT || 3000,
     httpsPort:443,
     debug: true,
     version: "0.1"
 };

module.exports.projectDirectory = __dirname;

module.exports.deploymentUrl = "http://branch-locator.herokuapp.com/";

module.exports.defaultLocation = {
    lat:1.300614,
    long:103.845104
}