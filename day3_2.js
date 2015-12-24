var fs = require('fs');

var input = fs.readFileSync("input3.txt", { encoding: 'utf8' });
var directions = input.split("");

var santa = [0,0];
var robo = [0,0];

var grid = {"0,0": 2};
var turn = 0;

for(var i=0; i < directions.length; ++i) {

  var d = directions[i];
  var x = 0;
  var y = 0;
  ``
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

  var key;

  if (turn++ % 2) {
    santa[0] += x;
    santa[1] += y;
    key = santa[0] + "," + santa[1];
  }
  else {
    robo[0] += x;
    robo[1] += y;
    key = robo[0] + "," + robo[1];
  }

  grid[key] = (grid[key] || 0) + 1;
};

console.log("delivered: "+Object.keys(grid).length);
