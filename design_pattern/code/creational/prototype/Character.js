class Character {
  constructor(name, type, faction, weapon, armor) {
    this.name = name;
    this.type = type;
    this.faction = faction;
    this.weapon = weapon;
    this.armor = armor;
  }

  clone() {
    return new Character(this.name, this.type, this.faction, this.weapon, this.armor);
  }
}

module.exports = Character;
