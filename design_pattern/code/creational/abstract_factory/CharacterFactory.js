class CharacterFactory {
  createWarrior() {
    throw new Error('createWarrior() must be implemented');
  }

  createMage() {
    throw new Error('createMage() must be implemented');
  }
}

module.exports = CharacterFactory;
