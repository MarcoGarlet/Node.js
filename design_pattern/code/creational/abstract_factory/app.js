/*
The key difference between the Abstract Factory pattern and the Factory Method pattern is that the Abstract Factory pattern is designed to create families of related objects, whereas the Factory Method pattern is designed to create individual objects.
*/

const GoodCharacterFactory = require('./GoodCharacterFactory');
const EvilCharacterFactory = require('./EvilCharacterFactory');

const goodFactory = new GoodCharacterFactory();
const evilFactory = new EvilCharacterFactory();

const goodWarrior = goodFactory.createWarrior('Arthur');
console.log(goodWarrior); // Character { name: 'Arthur', type: 'Warrior', faction: 'Good' }

const evilMage = evilFactory.createMage('Saruman');
console.log(evilMage); // Character { name: 'Saruman', type: 'Mage', faction: 'Evil' }
