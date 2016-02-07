require('rooty')('./');

var test = require('tape'),
    validator = require('^validator'),
    errors = require('^errors'),
    commands = require('^commands'),
    stateNotPlaced = { 
        position: {
            x: null,
            y: null
        },
        direction: false, 
        placed: false 
    },
    statePlaced = { 
        position: {
            x: 1,
            y: 2
        },
        direction: 'north', 
        placed: true 
    },
    validOptions = [1,1,'north'],
    invalidOptions = [1,1],
    place = {};

test('placed', function(t){
    t.plan(5);

    validator.placed('left', stateNotPlaced, function(err, msg ){
            t.equal(err.error, errors.notPlaced )
    });

    validator.placed('report', stateNotPlaced, function(err, msg ){
            t.equal(err, null);
            t.equal(msg, 'report');
    });    

    validator.placed('right', statePlaced, function(err, msg ){
            t.equal(err, null);
            t.equal(msg, 'right');
    });
});
    
test('validCommand', function(t){
    t.plan(3);

    validator.validCommand('left', commands, function(err, msg ){
            t.equal(err, null);
            t.equal(msg, 'left');
    });

    validator.validCommand('asdf', commands, function(err, msg ){
            t.equal(err.error, errors.invalidCommand);
    });
});

test('validDirection', function(t){
    t.plan(3);

    validator.validDirection('north', function(err, msg ){
            t.equal(err, null);
            t.equal(msg, 'Direction valid');
    });

    validator.validDirection('asdf', function(err, msg ){
            t.equal(err.error, errors.invalidDirection);
    });
});

test('validOptions', function(t){
    t.plan(3);

    validator.validOptions('place', validOptions, function(err, msg ){
            t.equal(err, null);
            t.equal(msg, 'place');
    });

    validator.validOptions('place', invalidOptions,  function(err, msg ){
            t.equal(err.error, errors.invalidOptions);
    });
});

test('validPosition', function(t){
    t.plan(3);

    validator.validPosition( 1, 1, function(err, msg ){
            t.equal(err, null);
            t.equal(msg, errors.validPosition );
    });

    validator.validPosition( 8, -10,  function(err, msg ){
            t.equal(err.error, errors.outOfBounds);
    });
});


