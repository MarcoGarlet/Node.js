const Character = require('./Character');
const CharacterPrototype = require('./CharacterPrototype');

// Register prototype objects
const warriorPrototype = new Character('Arthur', 'Warrior', 'Good', 'Sword', 'Plate mail');
const magePrototype = new Character('Gandalf', 'Mage', 'Good', 'Staff', 'Robe');
const orcPrototype = new Character('Azog', 'Orc', 'Evil', 'Axe', 'Chain mail');

const characterPrototype = new CharacterPrototype();
characterPrototype.register('Warrior', warriorPrototype);
characterPrototype.register('Mage', magePrototype);
characterPrototype.register('Orc', orcPrototype);

// Create new objects
const newWarrior = characterPrototype.create('Warrior');
console.log(newWarrior); // Character { name: 'Arthur', type: 'Warrior', faction: 'Good', weapon: 'Sword', armor: 'Plate mail' }

const newMage = characterPrototype.create('Mage');
console.log(newMage); // Character { name: 'Gandalf', type: 'Mage', faction: 'Good', weapon: 'Staff', armor: 'Robe' }

const newOrc = characterPrototype.create('Orc');
console.log(newOrc); // Character { name: 'Azog', type: 'Orc', faction: 'Evil', weapon: 'Axe', armor: 'Chain mail' }
