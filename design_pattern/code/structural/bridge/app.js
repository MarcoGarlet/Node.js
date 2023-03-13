const Sword = require('./sword');
const WeaponImpl = require('./weaponImpl');

const weaponImpl = new WeaponImpl();
const sword = new Sword('Sword', 10, weaponImpl);
sword.attack(); // Output: "Swinging the weapon" and "Attacking with a Sword for 10 damage"
