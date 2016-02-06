var config = require('^config'),
    tableDimensions = config.tableDimensions,
    tableEval = config.tableEval,
    errors = require('^errors');

module.exports = function (x,y, callback){
    var err = {};
    err.error = errors.outOfBounds;
    err.msg = validate(x,y);
    ( err.msg )? callback(err ) : callback(null, 'Position valid');
}

function validate(x,y){
    var msg = null;
    for (edge in tableDimensions ){
        var evalX = x + ' '+ tableEval[edge].x + ' '+ tableDimensions[edge].x;
        var evalY = y + ' '+ tableEval[edge].y + ' '+ tableDimensions[edge].y;

        if  ( !eval (evalX) ) {
            msg += '\nFor the ' + edge + ' corner, x must be ' + tableEval[edge].x + ' ' + tableDimensions[edge].x + ', you gave ' + x;
        }

        if (  !eval ( evalY ) ) {
            msg += '\nFor the ' + edge + ' corner, y must be ' + tableEval[edge].y + ' ' + tableDimensions[edge].y + ', you gave ' + y;
            
        }
    }
    return msg; 
}