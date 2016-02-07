require('rooty')('./');

var test = require('tape'),
    validator = require('^validator'),
    errors = require('^errors'),
    commands = require('^commands'),
    config = require('^config'),
    stateNotPlaced = { 
        position: {
            x: null,
            y: null
        },
        direction: false, 
        placed: false 
    },
    statePlaced = { position: { x: 1, y: 2 }, direction: 'north', placed: true },
    northStatePlaced = { position: { x: 5, y: 5 }, direction: 'north', placed: true },
    westStatePlaced = { position: { x: 0, y: 0 }, direction: 'west', placed: true },
    southStatePlaced = { position: { x: 0, y: 0 }, direction: 'south', placed: true },
    eastStatePlaced = { position: { x: 5, y: 5 }, direction: 'east', placed: true },
    validOptions = [1,1,'north'],
    invalidOptions = [1,1],
    place = {};

test('left', function(t){
    t.plan(8);

    commands.left( northStatePlaced, validOptions, function(err, newState, msg ){
        t.equal(err, null);
        t.equal(newState.direction, 'west');
    });
    
    commands.left( westStatePlaced, validOptions, function(err, newState, msg ){
        t.equal(err, null);
        t.equal(newState.direction, 'south');
    });
    
    commands.left( southStatePlaced, validOptions, function(err, newState, msg ){
        t.equal(err, null);
        t.equal(newState.direction, 'east');
    });
    
    commands.left( eastStatePlaced, validOptions, function(err, newState, msg ){
        t.equal(err, null);
        t.equal(newState.direction, 'north');
    });

});
    
test('right', function(t){
    t.plan(8);

    commands.left( northStatePlaced, validOptions, function(err, newState, msg ){
        t.equal(err, null);
        t.equal(newState.direction, 'south');
    });
    
    commands.left( westStatePlaced, validOptions, function(err, newState, msg ){
        t.equal(err, null);
        t.equal(newState.direction, 'east');
    });
    
    commands.left( southStatePlaced, validOptions, function(err, newState, msg ){
        t.equal(err, null);
        t.equal(newState.direction, 'north');
    });
    
    commands.left( eastStatePlaced, validOptions, function(err, newState, msg ){
        t.equal(err, null);
        t.equal(newState.direction, 'west');
    });

});

// test('move', function(t){
//     t.plan(3);
//     // module.exports = function (currentState, options, callback){
    
//     commands.move('north', function(err, msg ){
//             t.equal(err, null);
//             t.equal(msg, 'Direction valid');
//     });

//     validator.validDirection('asdf', function(err, msg ){
//             t.equal(err.error, errors.invalidDirection);
//     });
// });

// test('place', function(t){
//     t.plan(3);

//     commands.place('place', validOptions, function(err, msg ){
//             t.equal(err, null);
//             t.equal(msg, 'place');
//     });

//     commands.place('place', invalidOptions,  function(err, msg ){
//             t.equal(err.error, errors.invalidOptions);
//     });
// });

test('report', function(t){
    t.plan(3);

    var str = '';
    for (var p in statePlaced) {
        if (statePlaced.hasOwnProperty(p)) {
            str += p + ': ' + JSON.stringify(statePlaced[p]) + '\n';
        }
    }

    commands.report( statePlaced, validOptions, function(err, state, msg ){
            t.equal(err, null);
            t.deepEqual(state, statePlaced );
            t.deepEqual(msg, str );
    });
});
