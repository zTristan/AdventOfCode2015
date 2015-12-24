var fs = require('fs');

function replaceMolecule(molecule, find, replace, index) {
    var moles = molecule.split(find);
    var newMolecule = "";
    for (var i=0; i < moles.length-1; ++i) {
        newMolecule += moles[i];
        if (i == index) {
            newMolecule += replace;
        }
        else {
            newMolecule += find;
        }
    }
    newMolecule += moles[moles.length-1];
    return newMolecule;
}

var input = fs.readFileSync("input19.txt", { encoding: 'utf8' });
input = input.split("\n");

var codes = [];
for (var i=0; i < input.length; ++i) {
    var res = input[i].match(/(\S+) => (\S+)/);
    if (res) {
        codes.push([res[1], res[2]]);
    }
}

codes.sort(function(a, b) {
    return b[1].length - a[1].length;
});

console.log(codes);

var molecule = input[input.length-1];
var step = 0;
while (molecule != "e") {
    console.log(molecule);
    for (var i=0; i < codes.length; ++i) {
        var find = codes[i][1];
        var replace = codes[i][0];

        if (molecule.match(find)) {
            molecule = molecule.replace(find, replace);
            break;
        }
    }
    step++;
    console.log("Step "+step);
}

console.log(step);
