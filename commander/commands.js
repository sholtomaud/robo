var config = require('^config'),
    errorMsg = require('^errors'),
    tableDimensions = config.tableDimensions,
    tableEval = config.tableEval;

module.exports = {
    validateOptions    : validateOptions,
    place       : place,
    move        : move,
    left        : left,
    right       : right,
    report      : report,
    valid    : ['place', 'move', 'left', 'right', 'report']
}

function validateOptions(options, callback){
    var x = options[0], y = options[1], f = options[2];
    var errors = [];
    
    if (options.length < 3){
        var msg = 'You need to place robo with 3 options. x & y positions and a direction\nE.g. robo >place 1,2,north';
        callback(errorMsg.invalidOptions,msg);

    }
    else{
        for (edge in tableDimensions ){
            var evalX = x + ' '+ tableEval[edge].x + ' '+ tableDimensions[edge].x;
            var evalY = y + ' '+ tableEval[edge].y + ' '+ tableDimensions[edge].y;

            if  ( !eval (evalX) ) {
                var err = {};
                err.error = errorMsg.outOfBoundsPlace;
                err.msg = '\n' + edge + ' edge, x must be ' + tableEval[edge].x + ' ' + tableDimensions[edge].x + ', you gave ' + x;
                errors.push(err);
            }

            if (  !eval ( evalY ) ) {
                var err = {};
                err.error = errorMsg.outOfBoundsPlace;
                err.msg = '\n' + edge + ' edge, y must be ' + tableEval[edge].y + ' ' + tableDimensions[edge].y + ', you gave ' + y;
                errors.push(err);
            }
        }

        if ( ! ( f in config.validDirections ) ) {
            var err = {};
            err.error = errorMsg.invalidDirection;
            err.msg = '\nPlease choose from: ' +  Object.keys(config.validDirections).join(', '); 
            errors.push(err);  
        }

        if ( errors.length > 0 ) {
            callback(errors);
        }

        else {
            callback(null,'validOptions');
        }
    }
    
}

function place(options, callback){
    var x = options[0],
        y = options[1],
        f = options[2];

    validOptions(options,function(error, msg){
        if (error){
            callback(error)    
        }    
    });    
}

function move(x,y, callback){
    callback(null, 'move');
}
    
function left(x,y, callback){
    callback(null, 'left');
}

function right(x,y, callback){
    callback(null, 'right');
}

function report(x,y, callback){
    callback(null, 'report');
}

    