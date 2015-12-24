
function lookAndSay(input) {
  var output = "";

  while (input.length > 0) {
    var number = input[0];
    var res = input.match("(^" + number + "+)");
    var length = res[1].length;

    output += length + number;
    input = input.slice(length);
  }

  return output;
}

var input = "1113122113";

var count = 0;
while(count++ < 50) {
  input = lookAndSay(input);
}

console.log(input.length);
