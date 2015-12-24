
var PRESENT_VALUE = 11;

var elves = {};

function getPresents(house) {
    var p = 0;
    var elf = house;
    while (elf > 0) {
        if ((house % elf) == 0) {
            var delivered = elves[elf] || 0;
            if (delivered < 50) {
                elves[elf] = delivered + 1;
                p += elf * PRESENT_VALUE;
            }
        }
        elf--;
    }
    return p;
}

var find = 29000000;
var house = 1;

while (1) {
    var presents = getPresents(house);

    if (presents > find) {
        break;
    }

    house++;
}

console.log(house);

//665280 low
