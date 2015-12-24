var fs = require('fs');

var input = fs.readFileSync("input7.txt", { encoding: 'utf8' });
var instructions = input.split("\n");
instructions.pop();

var values = {};

function get(key) {
  if (key.match(/^\d+$/)) {
    return parseInt(key);
  }
  else if (values[key]) {
    return values[key];
  }
  else {
    values[key] = calculateValue(key);
    return values[key];
  }
}

function getOpperation(key) {
  for (var i=0; i < instructions.length; ++i) {
    var instruction = instructions[i];
    var res = instruction.match(/(.*) -> (\S+)/);
    if (res && res[2] == key) {
      return res[1];
    }
  }
}

function calculateValue(key) {
  console.log("calculateValue " + key);
  var operation = getOpperation(key);
  var res;

  if (res = operation.match(/^(.*) AND (.*)$/)) {
    var a = get(res[1]);
    var b = get(res[2]);
    return a & b;
  }
  else if (res = operation.match(/^(.*) OR (.*)$/)) {
    var a = get(res[1]);
    var b = get(res[2]);
    return a | b;
  }
  else if (res = operation.match(/^(.*) LSHIFT (.*)$/)) {
    var a = get(res[1]);
    var b = get(res[2]);
    return a << b;
  }
  else if (res = operation.match(/^(.*) RSHIFT (.*)$/)) {
    var a = get(res[1]);
    var b = get(res[2]);
    return a >> b;
  }
  else if (res = operation.match(/^NOT (.*)$/)) {
    var a = get(res[1]);
    return ~a;
  }
  else {
    return get(operation);
  }
}

values = {b: get("a")};
console.log(get("a"));
