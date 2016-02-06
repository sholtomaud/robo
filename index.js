require('rooty')('./');

var colors = require('colors'),
    setup = require('^setup'),
    kgo = require('kgo'),
    config = require('^config'),
    commands = require('^commands'),
    errors = require('^errors'),
    state = require('^state'),
    validator = require('^validator');
    
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout, setup.completer);

rl.setPrompt('robo > ');
rl.prompt();

rl.on('line', function (cmd) {
    var cmdOpt = cmd.toLowerCase().split(' '),     
        command = cmdOpt[0],
        options = [];

    if ( cmdOpt.length > 1 ){
       options = cmdOpt[1].split(','); 
    }
    
    kgo
        ('validateCommand',function(done){
            validator.validCommand( command, commands, function(error, cmd){
                done(error, cmd);
            })
        })
        ('validatePlaced',['validateCommand'],function(command, done){
            validator.placed( command, state, function(error, cmd){
                done(error, cmd);
            })
        })
        ('commander',['validatePlaced'], function(command, done){
            commands[command](state, options, function(error, stateChange, msg){
                if ( stateChange ) state = stateChange;
                done(error, msg);
            }) 
        })
        ('fin',['commander'], function(msg){
            console.log(msg.cyan);
            rl.prompt();
            return;    
        })
        (['*'],function(err){
            console.log(err.error.underline.red,err.msg);
            rl.prompt();
            return;
        })    
});

rl.on('close', function() {
  console.log('power down');
  process.exit(0);
});

