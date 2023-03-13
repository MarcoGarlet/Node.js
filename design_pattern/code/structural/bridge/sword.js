const Weapon = require('./weapon');

class Sword extends Weapon {
  constructor(type, damage, weaponImpl) {
    super(type, damage);
    this.weaponImpl = weaponImpl;
  }

  attack() {
    this.weaponImpl.use();
    super.attack();
  }
}

module.exports = Sword;
