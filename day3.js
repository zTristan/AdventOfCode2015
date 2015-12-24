var fs = require('fs');

var input = fs.readFileSync("input3.txt", { encoding: 'utf8' });
var directions = input.split("");

var x = 0;
var y = 0;
var grid = {};

var santa = {};
var roboSanta = {};

for(var i=0; i < directions.length; ++i) {
  var d = directions[i];
  if (d == "<") {
    x--;
  }
  else if (d == ">") {
    x++;
  }
  else if (d == "^") {
    y++;
  }
  else if (d == "v") {
    y--;
  }
  else {
    continue;
  }

  var key = x + "," + y;

  grid[key] = (grid[key] || 0) + 1;
};

console.log("delivered: "+Object.keys(grid).length);
