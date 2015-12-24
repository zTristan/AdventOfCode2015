var fs = require('fs');

var input = fs.readFileSync("input9.txt", { encoding: 'utf8' });
input = input.split("\n");
input.pop();

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

var distances = {};

function setDistance(a, b, distance) {
  if (a > b) {
    distances[a+b] = distance;
  }
  else {
    distances[b+a] = distance;
  }
}

function getDistance(a, b) {
  if (a > b) {
    return distances[a+b];
  }
  else {
    return distances[b+a];
  }
}

var cities = [];

input.forEach(function(routeInput) {
  var res = routeInput.match(/(\S+) to (\S+) = (\d+)/);
  if (res) {
    cities.push(res[1]);
    cities.push(res[2]);
    setDistance(res[1], res[2], parseInt(res[3]));
  }
  cities = cities.getUnique();
});

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

var routes = permutator(cities);
var longest = 0;

routes.forEach(function(route) {
  var distance = 0;
  for (var i=0; i < route.length-1; ++i) {
    distance += getDistance(route[i], route[i+1]);
  }
  longest = Math.max(longest, distance);
});

console.log(longest);
