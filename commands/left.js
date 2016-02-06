var config = require('^config');
            
module.exports = function (currentState, options, callback){
    var newState = currentState;
    var newDirection = config.validTurn[currentState.direction].left;
    var msg = 'Direction now: ' + newDirection;             
    newState.direction = newDirection;
    callback(null, newState, msg);
}