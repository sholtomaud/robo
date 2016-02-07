require('rooty')('./');

var colors = require('colors'),
    setup = require('^setup'),
    kgo = require('kgo'),
    config = require('^config'),
    commands = require('^commands'),
    errors = require('^errors'),
    state = require('^state'),
    validator = require('^validator'),
    debug = require('debug')('robo:index');
    
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
            debug('Validating command', command);
            validator.validCommand( command, commands, function(error, cmd){
                done(error, cmd);
            })
        })
        ('verifyPlaced',['validateCommand'],function(command, done){
            debug('Verifying robo is placed');
            validator.placed( command, state, function(error, cmd){
                done(error, cmd);
            })
        })
        ('commander',['verifyPlaced'], function(command, done){
            debug('Running command ', command);
            commands[command](state, options, function(error, stateChange, msg){
                if ( stateChange ) state = stateChange;
                done(error, msg);
            }) 
        })
        ('fin',['commander'], function(msg){
            debug('No errors printing msg', msg);
            console.log(msg.cyan);
            rl.prompt();
            return;    
        })
        (['*'],function(err){
            debug('Error: ', err.error);
            console.error(err.error.underline.red,err.msg);
            rl.prompt();
            return;
        })    
});

rl.on('close', function() {
  console.log('power down'.blue);
  process.exit(0);
});

