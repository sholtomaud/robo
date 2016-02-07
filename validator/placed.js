var commands = require('^commands'),
    config = require('^config'),
    errors = require('^errors'),
    debug = require('debug')('robo:placed'),
    err = {};
    
module.exports = function (cmd, state, callback) {
    debug('Verify robo is place');
    err.error = errors.notPlaced;
    err.msg =  '\nPlease place robo within table surface dimensions\n' +  objToString( config.tableDimensions );
    
    if ( cmd == 'place' || cmd == 'report' ) {  
        debug(cmd, ' not require robo to be placed');
        callback(null, cmd); 
    }
    else if ( ! state.placed ){ 
        debug('Error: ', err.error);
        callback(err, cmd); 
    }
    else{
        debug(cmd, ' all good');
        callback(null, cmd);    
    } 
}

function objToString (obj) {
  var str = '';
    for (var p in obj) {
        debug('Object to string', p);
        if (obj.hasOwnProperty(p)) {
            str += p + ': ' + JSON.stringify(obj[p]) + '\n';
        }
    }
    return str ;
}
