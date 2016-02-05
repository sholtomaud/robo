var axel = require('axel'),
    keypress = require('keypress'),
    kgo = require('kgo'),
    config = require('^config'),
    errors = require('^errors'),
    state = require('^state'),
    commands = require('./commands'),
    validChar = config.validChar,
    optionsFlag = false,
    cli = '';    
    
function commandHandler(cmd, callback){
    var cmdOpt = cmd.split(' '),     
        command = cmdOpt[0],
        options = [];

    if ( cmdOpt.length > 1 ){
       options = cmdOpt[1].split(','); 
    }
    
    if ( command == 'report' ) {
        callback(null,objToString(state));
    }

    kgo
        ('validCommand',function(done){
            ( !( command in commands ) ) ? done('not valid command') : done(null, command) ;
        })
        (['*validCommand'], function(error){
            var message = '\nPlease choose from: ' +  commands.valid.join(', ');
            callback(errors.invalidCommand, message) ;
        })
        ('place',['validCommand'],function(command,done){
            if ( command == 'place') {
                done(null,command);
            }

            if ( command != 'place' && command != 'report' && ! state.placed ){
                 done(true);
            } 
        } )
        ('validPlace',['place'], function(place, done){
            if ( command == 'place'){
                commands.validateOptions(options,function(error, message){
                    if (error) {
                        state.placed = false;
                        callback(error, message);
                    }
                    else{
                        state.placed = true;
                        state.position['x'] = options[0];
                        state.position['y'] = options[1];
                        state.direction = options[2];
                        callback(null, 'Valid placing, Good!')   
                    }
                })    
            }
        })
        ('command',['!validPlace'], function(done){
            commands[command](options,function(error, message){
                if (error) {
                    callback(error, message);
                }
                else{
                    callback(null,'ok')   
                }
            }) 
        })
        (['*place'], function(error){
            var message = '\nPlease place robo within table surface dimensions\n' +  objToString(config.tableDimensions);
            callback(errors.notPlaced, message) 
        })
        (['*validPlace'], function(error, message){
            
            callback(errors.invalidOptions, error) 
        })
}

function objToString (obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + ': ' + JSON.stringify(obj[p]) + '\n';
        }
    }
    return str;
}


module.exports = commandHandler;