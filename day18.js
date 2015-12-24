var fs = require('fs');

var ROWS = 100;
var STEPS = 100;

function setGridValue(grid, x, y, value) {
    var index = y * ROWS + x;
    grid[index] = value;
}

function getGridValue(grid, x, y) {
    if (x == 0 && y == 0) return 1;
    if (x == ROWS-1 && y == 0) return 1;
    if (x == 0 && y == ROWS-1) return 1;
    if (x == ROWS-1 && y == ROWS-1) return 1;
    if (x < 0 || x >= ROWS ||
        y < 0 || y >= ROWS) {
        return 0;
    }
    var index = y * ROWS + x;
    return grid[index];
}

function getNeirborCount(grid, x, y) {
    var count = 0;
    for (var i=-1; i <= 1; ++i) {
        for (var j=-1; j <= 1; j++) {
            if (i==0 && j==0) continue;
            if (getGridValue(grid, x+j, y+i)) {
                count++;
            }
        }
    }
    return count;
}

function stepGrid(grid) {
    var newGrid = [];
    for (var y=0; y < ROWS; ++y) {
        for (var x=0; x < ROWS; ++x) {
            var neighborCount = getNeirborCount(grid, x, y);
            if (getGridValue(grid, x, y)) {
                var value = (neighborCount == 2 || neighborCount == 3) ? 1 : 0;
            }
            else {
                var value = (neighborCount == 3) ? 1 : 0;
            }
            setGridValue(newGrid, x, y, value);
        }
    }
    return newGrid;
}

function lightsOnCount(grid) {
    var sum = 0;
    for (var y=0; y < ROWS; ++y) {
        for (var x=0; x < ROWS; ++x) {
            if (getGridValue(grid, x, y)) {
                sum++;
            }
        }
    }
    return sum;
}

function printGrid(grid) {
    var string = "";
    for (var y=0; y < ROWS; ++y) {
        for (var x=0; x < ROWS; ++x) {
            if (getGridValue(grid, x, y)) {
                string += "#";
            }
            else {
                string += ".";
            }
        }
        string += "\n";
    }
    console.log(string);
}

var grid = [];

var input = fs.readFileSync("input18.txt", { encoding: 'utf8' });
for (var i=0; i < input.length; ++i) {
    var c = input[i];
    if (c == "#") {
        grid.push(1);
    }
    else if (c == ".") {
        grid.push(0);
    }
};

printGrid(grid);

for (var i=0; i < STEPS; ++i) {
    grid = stepGrid(grid);
}

printGrid(grid);

console.log(lightsOnCount(grid));

//883 low
