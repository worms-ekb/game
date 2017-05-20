class Weapon {
  contructor(obj, damage) {
    this.damage = damage
    this.obj = obj
    this.bullet = null
  }

  action(power, angle) {
    throw new Error('Not implemented method')
  }
}

class Bullet {
  constructor({ damage, weight }) {
    this.damage = damage
    this.weight = weight
  }
}

class RocketBullet extends Bullet {
  constructor() {
    super({ damage: 60, weight: 2 })
  }
}

class Rocket extends Weapon {
  action(power, angle) {
    this.bullet = new RocketBullet();
    this.bullet.reactiveMove(power, angle);
  }
}

module.exports = Weapon
module.exports.Rocket = Rocket
