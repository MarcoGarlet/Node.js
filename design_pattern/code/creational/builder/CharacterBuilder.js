const Character = require('./Character');
class CharacterBuilder {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.faction = '';
    this.weapon = '';
    this.armor = '';
  }

  setFaction(faction) {
    this.faction = faction;
    return this;
  }

  setWeapon(weapon) {
    this.weapon = weapon;
    return this;
  }

  setArmor(armor) {
    this.armor = armor;
    return this;
  }

  build() {
    return new Character(this.name, this.type, this.faction, this.weapon, this.armor);
  }
}

module.exports = CharacterBuilder;
