require('rooty')('./');

var test = require('tape'),
    validator = require('^validator'),
    errors = require('^errors'),
    commands = require('^commands'),
    config = require('^config'),
    testData = require('./testData.json');

test('left', function(t){
    t.plan(8);

    commands.left( testData.northStatePlaced, testData.validOptions, function(err, newState, msg ){
        t.equal(err, null);
        t.equal(newState.direction, 'west');
    });
    
    commands.left( testData.westStatePlaced, testData.validOptions, function(err, newState, msg ){
        t.equal(err, null);
        t.equal(newState.direction, 'south');
    });
    
    commands.left( testData.southStatePlaced, testData.validOptions, function(err, newState, msg ){
        t.equal(err, null);
        t.equal(newState.direction, 'east');
    });
    
    commands.left( testData.eastStatePlaced, testData.validOptions, function(err, newState, msg ){
        t.equal(err, null);
        t.equal(newState.direction, 'north');
    });

});
    
test('right', function(t){
    t.plan(8);

    commands.left( testData.northStatePlaced, testData.validOptions, function(err, newState, msg ){
        t.equal(err, null);
        t.equal(newState.direction, 'south');
    });
    
    commands.left( testData.westStatePlaced, testData.validOptions, function(err, newState, msg ){
        t.equal(err, null);
        t.equal(newState.direction, 'east');
    });
    
    commands.left( testData.southStatePlaced, testData.validOptions, function(err, newState, msg ){
        t.equal(err, null);
        t.equal(newState.direction, 'north');
    });
    
    commands.left( testData.eastStatePlaced, testData.validOptions, function(err, newState, msg ){
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
    for (var p in testData.statePlaced) {
        if (testData.statePlaced.hasOwnProperty(p)) {
            str += p + ': ' + JSON.stringify(testData.statePlaced[p]) + '\n';
        }
    }

    commands.report( testData.statePlaced, testData.validOptions, function(err, state, msg ){
            t.equal(err, null);
            t.deepEqual(state, testData.statePlaced );
            t.deepEqual(msg, str );
    });
});
