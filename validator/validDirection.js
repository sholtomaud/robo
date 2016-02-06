var config = require('^config'),
    errors = require('^errors'),
    err = {};

module.exports = function (direction, callback){
    err.error =errors.invalidDirection;
    err.msg = '\nPlease choose from: ' +  Object.keys(config.validDirections).join(', '); 
    
    ( ! ( direction in config.validDirections ) ) ? callback(err) : callback(null,'Direction valid');
}


