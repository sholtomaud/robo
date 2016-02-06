var config = require('^config'),
    kgo = require('kgo'),
    validator = require('^validator');

module.exports = function (currentState, options, callback){
    var newState = currentState,
        newPositin = {};
        newPositin.x = new Number (currentState.position.x),
        newPositin.y = new Number (currentState.position.y);
    
    kgo
        ('move', function( done ){
            newPositin.x += new Number(config.validDirections[currentState.direction].x);
            newPositin.y += new Number(config.validDirections[currentState.direction].y);
            done(null,newPositin);
        })    
        ('validatePosition',['move'], function( newPosition, done ){
            validator.validPosition( newPosition.x, newPosition.y, function(error, msg ){
                done(error, newPosition);
            })
        })
        ('updatePosition',['validatePosition'], function( newPosition ){
            var msg = 'Position now: ' + JSON.stringify( newPosition);             
            newState.position = newPosition;
            callback(null, newState, msg);
        })
        (['*'], function(err){
            callback(err) ;
        })
}