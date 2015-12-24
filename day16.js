var fs = require('fs');

var input = fs.readFileSync("input16.txt", { encoding: 'utf8' });
input = input.split("\n");

var aunts = [];

input.forEach(function(line) {
    var res = line.match(/Sue (\d+): (.*)/);
    var raw = res[2].split(", ");
    var gifts = {};
    raw.forEach(function(gift) {
        var res = gift.match(/(.*): (\d+)/);
        var name = res[1];
        var value = parseInt(res[2]);
        gifts[name] = value;
    })
    aunts.push(gifts);
});

var index = 0;
var best = 0;

var match = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
};

aunts.forEach(function(aunt, i) {
    var count = 0;
    Object.keys(aunt).forEach(function(gift) {
        if (gift == "cats" || gift == "trees" && aunt[gift] > match[gift]) {
            if (aunt[gift] > match[gift]) {
                count++;
            }
        }
        else if (gift == "pomeranians" || gift == "goldfish") {
            if (aunt[gift] < match[gift]) {
                count++;
            }
        }
        else if (aunt[gift] == match[gift]) {
            count++;
        }
    });
    if (count > best) {
        best = count;
        index = i;
    }
});

console.log(index+1);
