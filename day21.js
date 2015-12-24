var fs = require('fs');

var input = fs.readFileSync("input21.txt", { encoding: 'utf8' });
input = input.split("\n");

var shop = {};

var section;
input.forEach(function(line) {
    var res;
    if (res = line.match(/(\S+):/)) {
        section = res[1];
        shop[section] = [];
    }
    else if (res = line.match(/(\S+) (\d+) (\d+) (\d+)/)) {
        shop[section].push({
            name: res[1],
            cost: parseInt(res[2]),
            damage: parseInt(res[3]),
            armor: parseInt(res[4])
        });
    }
});

function addItem(type, index, items) {
    if (index < shop[type].length) {
        items.push(shop[type][index]);
    }
}

function makePlayer(items) {
    var player = {
        hp: 100,
        damage: 0,
        armor: 0,
        cost: 0
    }
    items.forEach(function(item) {
        ["damage", "armor", "cost"].forEach(function(stat) {
            player[stat] += item[stat];
        });
    });
    return player;
}

function battle(boss, player, debug) {
    var playerHp = player.hp;
    var bossHp = boss.hp;
    while (1) {
        bossHp -= Math.max(1, player.damage - boss.armor);
        if (debug) console.log("Boss: "+bossHp);
        if (bossHp <= 0) {
            return true;
        }
        playerHp -= Math.max(1, boss.damage - player.armor);
        if (debug) console.log("Player: "+playerHp);
        if (playerHp <= 0) {
            return false;
        }
    }
}

var boss = {
    hp: 103,
    damage: 9,
    armor: 2
}

var largestCost = 0;
var smallestCost = 9999999;

for (var w=0; w < shop.Weapons.length; ++w) {
for (var a=0; a < shop.Armor.length + 1; ++a) {
for (var r=0; r < Math.pow(shop.Rings.length + 1, 2); ++r) {
    var r1 = parseInt(r / (shop.Rings.length+1));
    var r2 = r % (shop.Rings.length + 1);
    if (r1 == r2 && r1 < shop.Rings.length) continue;
    
    var items = [];
    addItem("Weapons", w, items);
    addItem("Armor", a, items);
    addItem("Rings", r1, items);
    addItem("Rings", r2, items);

    var player = makePlayer(items);

    if (battle(boss, player)) {
        if (player.cost < smallestCost) {
            smallestCost = player.cost;
        }
    }
    else {
        if (player.cost > largestCost) {
            largestCost = player.cost;
        }
    }
}
}
}

console.log("Smallest: " +smallestCost);
console.log("Largest: " +largestCost);

// 227 low
// 282 high
