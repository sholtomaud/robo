require('rooty')('./');

var colors = require('colors'),
    commander = require('^commander'),
    config = require('^config');

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('robo > ');
rl.prompt();

rl.on('line', function (cmd) {
    commander(cmd.toLowerCase(), function(error,message){
        if ( error instanceof Array ){
            //handle an array of errors
            for (var i = error.length - 1; i >= 0; i--) {
                console.log(error[i].error.underline.red,error[i].msg);
            }
            rl.prompt();
            return;
        }
        else if(error){
            //handle just one error
            console.log(error.underline.red,message);
            rl.prompt();
            return;
        }
        
        console.log(message.underline.green);
        rl.prompt();
        return;
    });
});

rl.on('close', function() {
  console.log('power down');
  process.exit(0);
});