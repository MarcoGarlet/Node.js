const CharacterFactory = require('./CharacterFactory');
const Character = require('./Character');

class EvilCharacterFactory extends CharacterFactory {
  createWarrior(name) {
    return new Character(name, 'Warrior', 'Evil');
  }

  createMage(name) {
    return new Character(name, 'Mage', 'Evil');
  }
}

module.exports = EvilCharacterFactory;
