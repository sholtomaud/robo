require('rooty')('./');

var logic = require('^logic'),
    colors = require('colors'),
    render = require('^render'),
    commander = require('^commander'),
    settings = require('^config');

// commander.bindCommands();

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('robo > ');
rl.prompt();

// rl.question('What position do you want? ', (answer) => {
//   // TODO: Log the answer in a database
//   console.log('Thank you for your valuable feedback:', answer);
  
// });

rl.on('line', function (cmd) {
  commander(cmd, function(error,message){
        if (error){
            console.log(error.underline.red,message);
            rl.prompt();
            return;
        }
        
        console.log(message);
        rl.prompt();
        return;
  });
});


rl.on('close', function() {
  console.log('power down');
  process.exit(0);
});


// setInterval(logic, settings.logicFrameRate);
// setInterval(render, settings.renderFrameRate);



// var conf = require('./config.json'),
//     commander = require('^commander')
//     commands = conf.commands;

// console.log('validate',validate.validPlace(5,5) );

// var keypress = require('keypress');
 
// // make `process.stdin` begin emitting "keypress" events 
// keypress(process.stdin);
 
// var command = '';

// var currentPosition = {};

// // listen for the "keypress" event 
// process.stdin.on('keypress', function (ch, key) {
    
//     // Catch some exit or speed freaks
//     if (key && key.ctrl && key.name == 'c') {
//         process.stdin.pause();
//     }

//     if ( typeof key === "undefined" ) {
//         console.log('\r Whoa! Slow down there buddy');
//         return;
//     }
    
//     //Get my commands on return
//     else if (key.name == 'return' && command in commands ){
//         console.log('\r yep I know what that means, it means "',command,'"');
        

//         commander(command,function(error,msg){
//             if (error){ 
//                 console.log(error); 
//                 return; 
//             }

//         });

//         command = '';  
//     }
//     else if (key.name == 'return' && ! (command in commands) ){
//         console.log('Sorry I don\'t recognise the',command, 'command');  
//         command = '';
//     }
//     else{
//         command += key.name;
//         process.stdout.write(key.name);
//     }    
    
    

// });
 
// process.stdin.setRawMode(true);
// process.stdin.resume();

