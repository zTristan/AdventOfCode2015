
var spells = {
    missle: {
        cost: 53,
        damage: 4
    },
    drain: {
        cost: 73,
        damage: 2,
        heal: 2
    },
    shield: {
        cost: 113,
        effect: {
            turns: 6,
            armor: 7
        }
    },
    poison: {
        cost: 173,
        effect: {
            turns: 6,
            damage: 3
        }
    },
    recharge: {
        cost: 229,
        effect: {
            turns: 5,
            mana: 101
        }
    }
};

var spellNames = Object.keys(spells);

function applyEffects(state) {
    if (state.effects.shield) {
        state.player.armor = state.effects.shield.armor;
    }
    else {
        state.player.armor = 0;
    }
    if (state.effects.poison) {
        state.boss.hp -= state.effects.poison.damage;
    }
    if (state.effects.recharge) {
        state.player.mana += state.effects.recharge.mana;
    }
    
    
    Object.keys(state.effects).forEach(function(effectName) {
        state.effects[effectName].turns--;
        if (state.effects[effectName].turns <= 0) {
            delete state.effects[effectName];
        }
    });
}

function canCast(state, spellName) {
    if (state.effects[spellName]) {
        return state.effects[spellName].turns == 1;
    }
    return true;
}

function castSpell(state, spellName) {
    var spell = spells[spellName];
    state.boss.hp -= spell.damage || 0;
    state.player.hp += spell.heal || 0;
    state.player.mana -= spell.cost;
    state.manaUsed += spell.cost;
    
    if (spell.effect) {
        state.effects[spellName] = {
            turns: spell.effect.turns,
            damage: spell.effect.damage || 0,
            armor: spell.effect.armor || 0,
            mana: spell.effect.mana || 0
        };
    }
}

function bossAttack(state) {
    state.player.hp -= Math.max(1, state.boss.damage - state.player.armor);
}

function battleTurn(state, spellName) {
    state.player.hp--;
    if (state.player.hp <= 0) return -3;
    
    applyEffects(state);
    if (state.boss.hp <= 0) return 1;
    
    castSpell(state, spellName);
    if (state.player.mana <= 0) return -2;
    if (state.boss.hp <= 0) return 1;
    
    applyEffects(state);
    if (state.boss.hp <= 0) return 1;
    
    bossAttack(state);
    if (state.player.hp <= 0) return -1;
    
    return 0;
}

function findLowestMana(state) {
    var stateStr = JSON.stringify(state);
    var lowest = 9999999999;
    spellNames.forEach(function(spellName) {
        var state = JSON.parse(stateStr);
        state.turn++;
        if (canCast(state, spellName)) {
            var result = battleTurn(state, spellName);
            switch (result) {
                case 1:
                    if (state.manaUsed < lowest) {
                        lowest = state.manaUsed;
                    }
                    break;
                case 0:
                    var manaUsed = findLowestMana(state);
                    if (manaUsed < lowest) {
                        lowest = manaUsed;
                    }
                    break;
            }
        }
    });
    
    return lowest;
}

var state = {
    boss: {
        hp: 51,
        damage: 9,
        armor: 0
    },
    player: {
        hp: 50,
        mana: 500
    },
    manaUsed: 0,
    effects: {},
    turn: 0
}

console.log(findLowestMana(state));

// 1242 high
// 1216 correct
