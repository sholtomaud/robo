var errors = require('^errors'),
    err = {};

module.exports = function (cmd, commands, callback) {
    err.error =errors.invalidCommand;
    err.msg = validCommands(commands);
    
    ( !( cmd in commands ) ) ?  callback( err ) :  callback(null, cmd) ;
}

function validCommands (commands) {
    var str = '';

    for (var c in commands) {
        if (commands.hasOwnProperty(c)) { str += '\n' + c  ; }
    }
    return str;
}
