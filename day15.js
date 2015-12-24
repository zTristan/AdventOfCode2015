var fs = require('fs');

var input = fs.readFileSync("input15.txt", { encoding: 'utf8' });
input = input.split("\n");

var ingredients = {};

input.forEach(function(line) {
    var res = line.match(/(\S+): (.*)/);
    var key = res[1];
    ingredients[key] = {};

    var stats = res[2].split(", ");
    stats.forEach(function(stat) {
        var res = stat.match(/(\S+) (-?\d+)/);
        var name = res[1];
        var value = parseInt(res[2]);
        ingredients[key][name] = value;
    });
});

var ingredientKeys = Object.keys(ingredients);

function getScore(mix) {
    var values = {};

    Object.keys(mix).forEach(function(key) {
        var amount = mix[key];
        var stats = ingredients[key];
        Object.keys(stats).forEach(function(stat) {
            var value = values[stat] || 0;
            values[stat] = value + stats[stat] * amount;
        })
    });

    if (values.calories <= 500) {
        console.log(values);
        return Math.max(values.capacity * values.durability * values.flavor * values.texture, 0);
    }
    else {
        return 0;
    }
}

var mix = {};
ingredientKeys.forEach(function(key) {
    mix[key] = 25;
});

do {

    var nextMix = undefined;
    var score = getScore(mix);

    for (var i=0; i < ingredientKeys.length; ++i) {

        var a = ingredientKeys[i];

        for (var j=0; j < ingredientKeys.length; ++j) {

            var b = ingredientKeys[j];

            if (mix[b] == 0) continue;

            var testMix = {};
            ingredientKeys.forEach(function(key) {
                testMix[key] = mix[key];
            });

            testMix[a] += 1;
            testMix[b] -= 1;

            var newScore = getScore(testMix);

            if (newScore > score) {
                score = newScore;
                nextMix = testMix;
            }
        }
    }

    if (nextMix) {
        mix = nextMix;
    }
    else {
        break;
    }
} while(1);

console.log(mix);
console.log(getScore(mix));

14062500