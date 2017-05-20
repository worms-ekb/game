interface Canvas {
  draw();
}

interface Weapon extends WorldObject {
  damage: number;
  obj: SAT;
  action: () => void;
}

interface Bullet {
obj: SAT;
}

interface Player {
  hp: number;
  obj: SAT;
  move();
  receiveDamage(damage: number);
  die();
  fire((power, angle) => void, weapon: Weapon);
}

interface Team {
  id: number;
  worms: {[id: number]: Player};
  lastWorm: number;
}

interface Turn {
  startTime: Date;
  team: number;
}

interface Game {
  currentTurn: Turn;
  time: number;
  world: World;

  start(playersCount);
}

interface World {
  map: Map;

}

interface Map {
  obj: SAT;
}

class Game {
  constructor(world) {
    addCreatures();
    world.initMap();
    initTeams();
  }
}
