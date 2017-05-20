const {Rocket} = require('./Weapon')
const Team = require('./Team');

const TURN_DURATION = 30 * 1000

const startWeapon = new Rocket();

class Game {
  constructor(world, playersCount, wormsCount) {
    this.teams = Array.from({ length: playersCount }, () => new Team(wormsCount))
    this._currentTeam = null;
    this.weapon = startWeapon
    this.world = world;

    this.start();
    this.attachEventListeners();
  }

  get currentWormIndex() {
    return this.teams[this._currentTeam].currentWormIndex;
  }

  get currentTeam() {
    return this._currentTeam;
  }

  start() {
    this.switchTurn()
  }

  stop() {
    clearTimeout(this._timer);
  }

  attachEventListeners() {
    this.world.onMove((direction) => {
      this.teams[this._currentTeam].currentWorm.move(direction);
    })
    this.world.onDrag((power, angle) => {
      this.weapon.action(power, angle);
    })
  }

  switchTurn() {
    this._currentTeam = this._changeAndReturnTeam()
    this._timer = setTimeout(() => {
      this.switchTurn();
    }, TURN_DURATION)
  }

  _changeAndReturnTeam() {
    const nextTeamIndex = this._getNextTeamIndex();
    const team = this.teams[nextTeamIndex];
    team.updateCurrentWorm();
    return nextTeamIndex;
  }

  _getNextTeamIndex() {
    if (this._currentTeam === null) {
      return 0;
    }
    const currentIndex = this._currentTeam
    if (currentIndex === this.teams.length - 1) {
      return 0
    }
    return currentIndex + 1
  }
}

class Turn {
  constructor(team) {
    this.startTime = new Date();
    this.team = 0;
  }
}

module.exports = Game
