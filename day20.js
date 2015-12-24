
var PRESENT_VALUE = 10;

function presents(house) {
    var p = 0;
    var mod = house;
    while (mod > 0) {
        if ((house % mod) == 0) {
            p += mod * PRESENT_VALUE;
        }
        mod--;
    }
    return p;
}

var find = 29000000;
var house = 1;

while (1) {
    var value = presents(house++);

    if (value > find) {
        break;
    }
}

console.log(house);

665280
