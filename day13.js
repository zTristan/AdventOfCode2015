var fs = require('fs');

var input = fs.readFileSync("input13.txt", { encoding: 'utf8' });
input = input.split("\n");

Array.prototype.getUnique = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
      if(u.hasOwnProperty(this[i])) {
         continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
   }
   return a;
}

function permutator(inputArr) {
  var results = [];

  function permute(arr, memo) {
    var cur, memo = memo || [];

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }

  return permute(inputArr);
}

var happyness = {};

function setHappness(a, b, happyValue) {
  happyness[a+b] = happyValue;
}

function getHappness(a, b) {
  return happyness[a+b] || 0;
}

var people = [];

input.forEach(function(routeInput) {
  var res = routeInput.match(/(\S+) would (gain|lose) (\d+) happiness units by sitting next to (\S+)./);
  if (res) {
    people.push(res[1]);
    setHappness(res[1], res[4], (res[2] == "gain" ? 1 : -1) * parseInt(res[3]));
  }
  people = people.getUnique();
});

people.push("Tristan");

function permutator(inputArr) {
  var results = [];

  function permute(arr, memo) {
    var cur, memo = memo || [];

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }

  return permute(inputArr);
}

var arrangements = permutator(people);
var best = 0;

arrangements.forEach(function(arrangement) {
  var happyValue = 0;
  for (var i=0; i < arrangement.length; ++i) {
    var left = i - 1 < 0 ? arrangement.length-1 : i-1;
    var right = i + 1 > arrangement.length-1 ? 0 : i+1;

    happyValue += getHappness(arrangement[i], arrangement[left]);
    happyValue += getHappness(arrangement[i], arrangement[right]);
  }
  best = Math.max(best, happyValue);
});

console.log(best);
