var fs = require('fs');

var input = fs.readFileSync("input5.txt", { encoding: 'utf8' });
var strings = input.split("\n");

var nice = 0;
var blacklist = ["ab", "cd", "pq", "xy"];

function vowelCount(string) {
  var res = string.match(/[aeiou]/g);

  if (res) {
    return res.length;
  }
  else {
    return 0;
  }
}
``
function longestRepeating(string) {
  var characters = string.split("");
  var longest = 1;
  for (var i=0; i < characters.length - 1; ++i) {
    var c = characters[i];
    var count = 1;

    while (characters[i+1] == c) {
        count++;
        i++;
    }

    longest = Math.max(longest, count);
  }

  return longest;
}

function containsBlacklist(string) {
  for (var i=0; i < blacklist.length; ++i) {
    if (string.match(blacklist[i])) {
      return true;
    }
  }
  return false;
}

for(var i=0; i < strings.length; ++i) {
  var string = strings[i];

  if (   vowelCount(string) >= 3
      && longestRepeating(string) >= 2
      && !containsBlacklist(string)) {
    nice++;
  }
}

console.log("nice: "+nice);
