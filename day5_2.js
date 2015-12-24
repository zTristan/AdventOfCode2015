var fs = require('fs');

var input = fs.readFileSync("input5.txt", { encoding: 'utf8' });
var strings = input.split("\n");
strings.pop();

var nice = 0;

function containsPair(string) {
  var characters = string.split("");
  for (var i=0; i < characters.length-1; ++i) {
    var pair = characters[i] + characters[i+1];

    if (string.slice(i + 2).match(pair)) {
      return true;
    }
  }
  return false;
}

function stepRepeat(string) {
  var characters = string.split("");
  for (var i=0; i < characters.length-2; ++i) {
    var c = characters[i];
    if (characters[i+1] != c && characters[i+2] == c) {
      return true;
    }
  }
  return false;
}


for(var i=0; i < strings.length; ++i) {
  var string = strings[i];

  if (   containsPair(string)
      && stepRepeat(string)) {
    nice++;
  }
}

console.log("nice: "+nice);
