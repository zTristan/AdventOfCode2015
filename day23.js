var fs = require('fs');

var input = fs.readFileSync("input23.txt", { encoding: 'utf8' });
input = input.split("\n");

var R = {a:1};

function read(reg) {
	return R[reg] || 0;
}

function store(reg, value) {
	R[reg] = value;
}

function half(reg) {
	store(reg, read(reg) / 2);
}

function tpl(reg) {
	store(reg, read(reg) * 3);
}

function inc(reg) {
	store(reg, read(reg) + 1);
}

var instruction = 0;
while (instruction < input.length) {
	var line = input[instruction];
	var res = line.match(/(\S+) (.*)/);

	if (res) {
		var command = res[1];
        var params = res[2];

		console.log(instruction + ": " + command + " | " + res[2]);

		if (command == "hlf") {
			half(params);
            instruction++;
		}
		else if (command == "tpl") {
			tpl(params);
            instruction++;
		}
		else if (command == "inc") {
			inc(params);
            instruction++;
		}
		else if(command == "jmp") {
			var jump = parseInt(res[2]);
			instruction += jump;
		}
		else if (command == "jie") {
			var res = params.match(/(\S+), (\S+)/);
			var reg = res[1];
			var jump = parseInt(res[2]);
			instruction += read(reg) & 0x1 ? 1 : jump;
		}
		else if (command == "jio") {
			var res = params.match(/(\S+), (\S+)/);
			var reg = res[1];
			var jump = parseInt(res[2]);
			instruction += read(reg) == 1 ? jump : 1;
		}
	}
};

console.log(R);
