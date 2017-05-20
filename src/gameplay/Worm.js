class Worm {
  constructor(obj, name, hp) {
    this.weapon = {};
    this.speed = 100;
    this.obj = obj;
    this._name = name;
    this._hp = hp;
  }

  get hp() {
    return this._hp;
  }

  get isAlive() {
    return this._hp > 0;
  }

  receiveDamage(damage) {
    this._hp -= damage;

  }

  die() {
    this._hp = 0;
  }

  fire(power, angle) {
    this.weapon.action(power, angle);
  }

  move(direction) {
    this.obj.move(this.speed, direction);
  }
}

module.exports = Worm
