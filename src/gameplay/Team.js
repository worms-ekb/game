const Worm = require('./Worm.js');

class Team {
  constructor(countWorms) {
    this._worms = (new Array(countWorms)).fill(new Worm({}, 100));
    this._currentWormIndex = null;
  }

  get currentWorm() {
    return this._worms[this._currentWormIndex];
  }

  get currentWormIndex() {
    return this._currentWormIndex;
  }

  updateCurrentWorm() {
    if (this._currentWormIndex === this._worms.length - 1 || this._currentWormIndex === null) {
      this._currentWormIndex = 0;
      return;
    }
    this._currentWormIndex++
  }
}

module.exports = Team;
