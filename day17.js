var fs = require('fs');

var input = fs.readFileSync("input17.txt", { encoding: 'utf8' });
input = input.split("\n");

var values = [];

input.forEach(function(line) {
    values.push(parseInt(line));
});

var count = 0;
var numbers = values.length;
var combonations = Math.pow(2, numbers);
var smallest = numbers;
var smallCount = 0;
for (var i=0; i < combonations; ++i) {
    var sum = 0;
    var num = 0;
    for(var j=0; j < numbers; ++j) {
        if (i & 0x1 << j) {
            sum += values[j];
            num++;
        }
    }
    if (sum == 150) {
        count++;
        if (num < smallest) {
            smallest = num;
        }
        if (num == smallest) {
            smallCount++;
        }
    }
}

console.log(count);
console.log(smallCount);
