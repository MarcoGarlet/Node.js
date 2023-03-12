class CharacterPrototype {
  constructor() {
    this.prototypes = {};
  }

  register(type, prototype) {
    this.prototypes[type] = prototype;
  }

  create(type) {
    return this.prototypes[type].clone();
  }
}


module.exports = CharacterPrototype;
