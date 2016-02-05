var config = require('^config'),
    tableDimensions = config.tableDimensions;

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
    var error;
    var msg = {},
        error = null;

    if (options.length < 3){
        error = 'You need to place robo with 3 options. x & y positions and a direction\nE.g. robo >place 1,2,north';
        callback(error,null)
    }

    if ( x > tableDimensions.se.x ) {
        error ++;s 
        msg['x'] = 'se: '+x+' > ' + tableDimensions.se.x;
    }
    if ( x > tableDimensions.ne.x ) {
        error ++; 
        msg['x'] = 'ne: '+x+' > ' + tableDimensions.se.x;
    }
    if ( x < tableDimensions.sw.x ){
        error ++;
        msg['x'] = 'sw: '+x+' < ' + tableDimensions.sw.x ;
    } 
    if ( x < tableDimensions.nw.x ){
        error ++;
        msg['x'] = 'nw: '+x+' < ' + tableDimensions.nw.x;
    } 

    if ( y < tableDimensions.se.y ) {
        error ++; 
        msg['y'] = 'se: '+y+' < ' + tableDimensions.se.y;
    }
    if ( y > tableDimensions.ne.y ) {
        error ++; 
        msg['y'] = 'ne: '+y+' > ' + tableDimensions.se.y;
    }
    if ( y < tableDimensions.sw.y ){
        error ++;
        msg['y'] = 'sw: '+y+' < ' + tableDimensions.sw.y ;
    } 
    if ( y > tableDimensions.nw.y ){
        error ++;
        msg['y'] = 'nw: '+y+' > ' + tableDimensions.nw.y;
    } 

    if ( error ) {
        // console.log('eror',error);
        callback(error, msg);
    }

    callback(null,'validOptions');
}

function place(options, callback){
    var x = options[0],
        y = options[1],
        f = options[2];

    validPosition(x,y,function(error, msg){
        if (error){
            callback(error)    
        }    
        // callback(null, msg);
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

    