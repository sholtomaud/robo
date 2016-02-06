var config = require('^config'),
    errors = require('^errors'),
    err = {};

module.exports = function (cmd, options, callback){
    err.error = errors.invalidOptions;
    err.msg = '\nYou need to place robo with 3 options. x & y positions and a direction\nE.g. robo >place 1,2,north';

    ( cmd == 'place' && options.length != 3 )? callback(err, cmd) : callback(null, cmd);
    
}
