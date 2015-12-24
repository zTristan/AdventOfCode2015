var fs = require('fs');

var input = fs.readFileSync("input14.txt", { encoding: 'utf8' });
input = input.split("\n");

var reindeer = {};

input.forEach(function(line) {
    var res = line.match(/(\S+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./);
    if (res) {
        reindeer[res[1]] = {
            dps: parseInt(res[2]),
            time: parseInt(res[3]),
            rest: parseInt(res[4]),
            distance: 0,
            points: 0
        };
    }
});

var second = 0;
var leader = reindeer[Object.keys(reindeer)[0]];

while (second < 2503) {
    Object.keys(reindeer).forEach(function(key) {
        var deer = reindeer[key];

        if (second % (deer.time + deer.rest) < deer.time) {
            deer.distance += deer.dps;

            if (deer.distance > leader.distance) {
                leader = deer;
            }
        }
    });

    Object.keys(reindeer).forEach(function(key) {
        var deer = reindeer[key];

        if (deer.distance == leader.distance) {
            deer.points++;
        }
    });
    second++;
}

console.log(reindeer);

2263
2273