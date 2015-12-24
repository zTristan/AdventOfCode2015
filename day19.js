var fs = require('fs');

function replaceMolecule(molecule, code, index) {
    var moles = molecule.split(code.find);
    var newMolecule = "";
    for (var i=0; i < moles.length-1; ++i) {
        newMolecule += moles[i];
        if (i == index) {
            newMolecule += code.replace;
        }
        else {
            newMolecule += code.find;
        }
    }
    newMolecule += moles[moles.length-1];
    return newMolecule;
}

var input = fs.readFileSync("input19_.txt", { encoding: 'utf8' });
input = input.split("\n");

var codes = [];
for (var i=0; i < input.length; ++i) {
    var res = input[i].match(/(\S+) => (\S+)/);
    if (res) {
        codes.push({
            find: res[1],
            replace: res[2]
        });
    }
}

var molecule = input[input.length-1];
var molecules = {};

codes.forEach(function(code) {
    var count = (molecule.match(new RegExp(code.find, "g")) || []).length;
    for (var i=0; i < count; ++i) {
        var newMolecule = replaceMolecule(molecule, code, i);
        console.log(newMolecule);
        molecules[newMolecule] = 1;
    }
});

console.log(Object.keys(molecules).length);
