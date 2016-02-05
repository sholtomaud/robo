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
        // commands.report()
        callback(null,state);
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
        ('validOptions',['place'], function(place, done){
            if ( command == 'place'){
                commands.validateOptions(options,function(error, message){
                    if (error) {
                        state.placed = false;
                        done(true, message);
                    }
                    else{
                        state.placed = true;
                        done(null,'Valid placing, Good!');    
                    }
                })    
            }
            done(null);
            
        })
        ('command',['!validOptions'], function(done){
            
        })
        (['*place'], function(error){
            var message = '\nPlease place robo within table surface dimensions\n' +  objToString(config.tableDimensions);
            callback(errors.notPlaced, message) 
        })
        (['*validOptions'], function(error, message){
            callback(errors.invalidOptions, message) 
        })
        
        
    // if ( cli in commands ){}
    //             console.log('\nYep I know what that means');
                
    //             commands[cli](options, function(error,msg){
    //                 if (error){ 
    //                     console.log(error); 
    //                     return; 
    //                 }
    //                 console.log('\nreturn message',msg);
    //             });
                
    //             cli = '';  
    //         }
    //         else {
    //             console.log('\nSorry I don\'t recognise the command. Please use one of the following:',commands);  
    //             cli = '';
    //             optionsFlag = false;
    //         }  

    //     break;
    //     case 'backspace':
    //         cli = cli.slice(0, -1);
    //         process.stdout.write('\x1b\x7f');
    //     break;
    //     default:
    //         cli += keystroke;
    //         process.stdout.write(keystroke);
    // }

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