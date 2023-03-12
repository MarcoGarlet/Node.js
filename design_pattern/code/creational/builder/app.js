const CharacterBuilder = require('./CharacterBuilder');

const goodWarriorBuilder = new CharacterBuilder('Arthur', 'Warrior').setFaction('Good').setWeapon('Sword').setArmor('Plate mail');
const goodWarrior = goodWarriorBuilder.build();
console.log(goodWarrior); // Character { name: 'Arthur', type: 'Warrior', faction: 'Good', weapon: 'Sword', armor: 'Plate mail' }

const evilMageBuilder = new CharacterBuilder('Saruman', 'Mage').setFaction('Evil').setWeapon('Staff').setArmor('Robe');
const evilMage = evilMageBuilder.build();
console.log(evilMage); // Character { name: 'Saruman', type: 'Mage', faction: 'Evil', weapon: 'Staff', armor: 'Robe' }
