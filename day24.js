var fs = require('fs');

function quantiumEntanglement(packages) {
    var qe = 1;
    packages.forEach(function(p) {
        qe *= p;
    })
    return qe;
}

function sum(packages) {
    var sum = 0;
    packages.forEach(function(p) {
        sum += p;
    });
    return sum;
}

function combinations(numArr, choose, callback) {
    var n = numArr.length;
    var c = [];
    var inner = function(start, choose_) {
        if (choose_ == 0) {
            callback(c);
        } else {
            for (var i = start; i <= n - choose_; ++i) {
                c.push(numArr[i]);
                inner(i + 1, choose_ - 1);
                c.pop();
            }
        }
    }
    inner(0, choose);
}

function smallestQuantium(packages, target) {
    var smallestQe = quantiumEntanglement(packages);
    var smallestSize = packages.length;
    combinations(packages, 2, function(combo) {
        if (sum(combo) == target) {
            var qe = quantiumEntanglement(combo);
            if (combo.length < smallestSize) {
                smallestSize = combo.length;
                smallestQe = qe;
            }
            else if (combo.length == smallestSize && qe < smallestSize) {
                smallestQe = qe;
            }
        }
    });
    return smallestQe;
}

var input = fs.readFileSync("input24.txt", { encoding: 'utf8' });
input = input.split("\n");

var packages = [];
var total = 0;

input.forEach(function(line) {
    var res = line.match(/(\d+)/);
    if (res) {
        var p = parseInt(res[1]);
        packages.push(p);
        total += p;
    }
});

var NUMGROUPS = 4;
var target = parseInt(total / NUMGROUPS);

console.log(smallestQuantium(packages, target));
