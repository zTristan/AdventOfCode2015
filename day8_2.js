var fs = require('fs');

var input = fs.readFileSync("input8.txt", { encoding: 'utf8' });
var strings = input.split("\n");
strings.pop();

var memCharacters = 0;
var litCharacters = 0;

strings.forEach(function(string) {
  string = string.slice(0, string.length-1);
  litCharacters += string.length;

  var length = string.length + 2;

  var res = string.match(/(")|(\\)/g);

  console.log(res);

  if (res) {
    length += res.length;
  }

  memCharacters += length;
});

console.log(litCharacters);
console.log(memCharacters);
console.log(memCharacters - litCharacters);

3634
2117
