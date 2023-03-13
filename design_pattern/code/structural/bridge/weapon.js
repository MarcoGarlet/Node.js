class Weapon {
  constructor(type, damage) {
    this.type = type;
    this.damage = damage;
  }

  getType() {
    return this.type;
  }

  getDamage() {
    return this.damage;
  }

  attack() {
    console.log(`Attacking with a ${this.getType()} for ${this.getDamage()} damage`);
  }
}

module.exports = Weapon;
