class Worm {
  constructor(obj, name, hp) {
    this.weapon = {};
    this.speed = 100;
    this.obj = obj;
    this._name = name;
    this._hp = hp;
    this.isAlive = true;
  }
  
  receiveDamage(damage) {
    this._hp -= damage;

    if (this._hp <= 0) {
      this.die();
    }
  }

  die() {
    this.isAlive = false;
  }

  fire(power, angle) {
    this.weapon.action(power, angle);
  }

  move(direction) {
    this.obj.move(this.speed, direction);
  }
}
