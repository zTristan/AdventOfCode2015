var fs = require('fs');

var input = fs.readFileSync("input2.txt", { encoding: 'utf8' });
var presents = input.split("\n");

var total = 0;
var ribbon = 0;

presents.forEach(function(present) {

  var dim = present.split("x").map(function(i) {
    return parseInt(i);
  });

  var l = dim[0];
  var w = dim[1];
  var h = dim[2];

  dim.sort(function(a,b){return a-b});

  var side1 = dim[0];
  var side2 = dim[1];

  total += side1 * side2;
  total += 2*l*w + 2*w*h + 2*h*l;

  ribbon += side1 * 2 + side2 * 2;
  ribbon += l * w * h;

});

console.log("total: "+total);
console.log("ribbon: "+ribbon);
