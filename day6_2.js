var fs = require('fs');

var input = fs.readFileSync("input6.txt", { encoding: 'utf8' });
var instructions = input.split("\n");
instructions.pop();

var ROWS = 1000;
var COLS = 1000;

function incValue(lights, value, start, end) {
  for (var x = start[0]; x <= end[0]; ++x) {
    for (var y = start[1]; y <= end[1]; ++y) {
      lights[y * COLS + x] = Math.max(lights[y * COLS + x] + value, 0);
    }
  }
}

function toggleValue(lights, start, end) {
  for (var x = start[0]; x <= end[0]; ++x) {
    for (var y = start[1]; y <= end[1]; ++y) {
      lights[y * COLS + x] += 2;
    }
  }
}

function printCount(lights) {
  var lightsOn = 0;
  lights.forEach(function(value) {
    lightsOn += value;
  });

  console.log("lights on: " + lightsOn);
}

var lights = [];
for (var i=0; i < ROWS * COLS; ++i) {
    lights.push(0);
}

instructions.forEach(function(instruction) {
  var res = instruction.match(/(.*) (\d+),(\d+) through (\d+),(\d+)/);
  if (res) {
    var cmd = res[1];
    var start = [parseInt(res[2]), parseInt(res[3])];
    var end = [parseInt(res[4]), parseInt(res[5])];

    if (cmd == "turn on") {
      incValue(lights, 1, start, end);
    }
    else if (cmd == "turn off") {
      incValue(lights, -1, start, end);
    }
    else if (cmd == "toggle") {
      toggleValue(lights, start, end);
    }
  }
});

printCount(lights);
