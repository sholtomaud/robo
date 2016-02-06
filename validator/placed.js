var commands = require('^commands'),
    config = require('^config'),
    errors = require('^errors'),
    err = {};
    
module.exports = function (cmd, state, callback) {
    err.error = errors.notPlaced;
    err.msg =  '\nPlease place robo within table surface dimensions\n' +  objToString( config.tableDimensions );
    
    if ( cmd == 'place' || cmd == 'report' ) {  
        callback(null, cmd); 
    }
    else if ( ! state.placed ){ 
        callback(err, cmd); 
    }
    else{
        callback(null, cmd);    
    } 
}

function objToString (obj) {
  var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + ': ' + JSON.stringify(obj[p]) + '\n';
        }
    }
    return str ;
}
