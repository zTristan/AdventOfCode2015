var fs = require('fs');

var input = fs.readFileSync("input12.txt", { encoding: 'utf8' });
var json = JSON.parse(input);

function getSum(obj) {
	if (Array.isArray(obj)) {
		var sum = 0;
		obj.forEach(function(o) {
			sum += getSum(o);
		});
		return sum;
	}
	else if (typeof obj === 'object') {
		var sum = 0;
		var keys = Object.keys(obj);
		for (var i=0; i < keys.length; ++i) {
			if (obj[keys[i]] == "red") {
				return 0;
			}
			sum += getSum(obj[keys[i]]);
		}
		return sum;
	}
	else if (typeof obj === 'string') {
		return 0;
	}
	else {
		return parseInt(obj);
	}
}

console.log(getSum(json));
