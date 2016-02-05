var ctx = require('axel'),
    spacing = ctx.rows / 6;

module.exports = {
    logicFrameRate: 100,
    renderFrameRate: 50,
    tableWidth: ctx.cols,
    tableHeight: ctx.rows,
    margin: 5,
    width: 1,
    height: 1,
    maxPos: ctx.rows / 2 - 2,
    tableDimensions : {
            "sw": { "x":0, "y":0 },
            "nw": { "x":0, "y":5 },
            "ne": { "x":5, "y":5 },
            "se": { "x":5, "y":0 }
    },
    tableEval : {
            "sw": { "x":">=", "y":">=" },
            "nw": { "x":">=", "y":"<=" },
            "ne": { "x":"<=", "y":"<=" },
            "se": { "x":"<=", "y":">=" }
    },
    validDirections: {
        "north": 1,
        "south" :1,
        "east" :1,
        "west" : 1
    },
    move : 1
}