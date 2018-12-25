const _ = require('lodash');

if (weapon || _.isEmpty(weapon.name)) {
    // invalid weapon
}

if (weapon || _.isEmpty(weapon.name) || !_.isString(weapon.name) ||
    (!_.isNumber(weapon.fireRate) || weapon.fireRate < 0.1 || weapon.fireRate > 10) ||
    (!_.isNumber(weapon.damage) || weapon.damage < 1 || weapon.damage > 200) ||
    !_.includes(weapon.rarity, ['Epic', 'Legendary', 'Common', 'Uncommon', 'Rare'])) {
    // invalid weapon
}




