const Weapon = require('../src/gameplay/Weapon.js');
const Worm = require('../src/gameplay/Worm.js');
const Game = require('../src/gameplay/Game.js');
const Team = require('../src/gameplay/Team.js');

const obj = {
  move: jest.fn()
}

jest.useFakeTimers();

describe('Worm', () => {
  it('creates', () => {
    new Worm(obj, 'Antuan', 100)
  })

  it('receives damage', () => {
    const worm = new Worm(obj, 'Antuan', 100);
    worm.receiveDamage(50);
    expect(worm.hp).toBe(50);
  })

  it('should die when receive critical damage', () => {
    const worm = new Worm(obj, 'Antuan', 100);
    worm.receiveDamage(100);
    expect(worm.isAlive).toBe(false);
  })

  it('should die when we want', () => {
    const worm = new Worm(obj, 'Antuan', 100);
    worm.die();
    expect(worm.isAlive).toBe(false);
  })
})

describe('Team', function() {
  beforeEach(() => {
    this.team = new Team(2);
  });

  it('updateCurrentWorm', () => {
    this.team.updateCurrentWorm();
    expect(this.team.currentWormIndex).toBe(0);

    this.team.updateCurrentWorm();
    expect(this.team.currentWormIndex).toBe(1);

    this.team.updateCurrentWorm();
    expect(this.team.currentWormIndex).toBe(0);
  });
});

describe('Weapon', () => {
  it('should throw when call abstract method', () => {
    const weapon = new Weapon();
    expect(weapon.action).toThrow()
  })
})

describe('Game', function() {
  beforeEach(() => {
    this.game = new Game({onMove: () => {}, onDrag: () => {}}, 2, 2);
  })

  afterEach(() => {
    this.game.stop();
    this.game = null;
  })

  it('Switches reqursive turn team', () => {
    expect(this.game.currentTeam).toBe(0)
    jest.runOnlyPendingTimers()
    expect(this.game.currentTeam).toBe(1)
    jest.runOnlyPendingTimers()
    expect(this.game.currentTeam).toBe(0)
    jest.runOnlyPendingTimers()
    expect(this.game.currentTeam).toBe(1)
    jest.runOnlyPendingTimers()
    expect(this.game.currentTeam).toBe(0)
  })

  it('Switches turn to worm', () => {
    const worm1 = this.game.currentWormIndex;

    jest.runOnlyPendingTimers()
    jest.runOnlyPendingTimers()

    const worm2 = this.game.currentWormIndex;

    expect(worm1 === worm2).toBe(false)
    jest.runOnlyPendingTimers()

    jest.runOnlyPendingTimers()

    const worm3 = this.game.currentWormIndex;

    expect(worm1 === worm3).toBe(true)
  })

})
