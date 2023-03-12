const CharacterFactory = require('./CharacterFactory');
const Character = require('./Character');

class GoodCharacterFactory extends CharacterFactory {
  createWarrior(name) {
    return new Character(name, 'Warrior', 'Good');
  }

  createMage(name) {
    return new Character(name, 'Mage', 'Good');
  }
}

module.exports = GoodCharacterFactory;
