var kgo = require('kgo'),
    validator = require('^validator');

module.exports = function (currentState, options, callback){
    var newState = {};
    
    kgo
        ( 'validateOptions', function( done){
            validator.validOptions( 'place', options, function( error  ){
                done(error,'place'); 
            })  
        })
        ( 'validateFacing',['validateOptions'], function( command, done ){
            validator.validDirection( options[2], function( error, msg ){
                done(error, msg);        
            })
        })
        ('validatePosition',['!validateFacing'], function( done ){
            validator.validPosition( options[0], options[1] , function(error, msg ){
                done(error, msg);
            })
        })
        ('place',['!validatePosition'], function(){
            var msg = 'Valid placing. Position now at:\nx: ' + options[0] + '\ny: '+ options[1] + '\nfacing: ' + options[2];             
            var position = {};
            position.x = options[0];             
            position.y = options[1];             
            newState.position = position;
            newState.direction = options[2];
            newState.placed = true;
            callback(null, newState, msg);
        })        
        (['*'], function(err){
            callback(err) ;
        })
}