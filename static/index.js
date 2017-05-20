var width = window.innerWidth
var height = window.innerHeight

var game = new Phaser.Game(
    width,
    height,
    Phaser.CANVAS,
    'worms',
    {
        preload: preload,
        create: create,
        update: update
    });

var poly;
var graphics;
var worm;
var ground;
var cursors;
var bg;
var wormScale = .5;

var speechRecognizer;
var groundCollisionGroup;
var wormCollisionGroup;
var bulletCollisionGroup;

const MoveDirections = {
    Left: 'Left',
    Right: 'Right'
}

var bulletScale = .5;

function preload() {
	game.load.image('sky', 'assets/sprites/sky.jpg');
	game.load.image('worm', 'assets/sprites/worm.png');
  game.load.image('grenade', 'assets/sprites/bullet.png');
	game.load.image('worm_inverted', 'assets/sprites/worm_inverted.png');
	game.load.image('ground', 'assets/sprites/ground.gif');
  game.load.image('ground_tile', 'assets/sprites/ground.jpg');
	game.load.physics('physics', 'assets/physics.json');
  game.load.spritesheet('waters', './assets/sprites/waters.png', 32, 400, 32);
  game.load.image('fire1', 'assets/particles/fire1.png');
  game.load.image('fire2', 'assets/particles/fire2.png');
  game.load.image('fire3', 'assets/particles/fire3.png');
  game.load.image('smoke', 'assets/particles/smoke.png');
}

function gerPoygon() {
    var randomLine = [];

    var trandsCount = 5;
    var tailsCount = 10 ;

    var trandWidth = width / trandsCount;
    var pointY = (Math.random() * 0.5 + 0.4) * height;

    for(var i = 0; i < trandsCount; i++) {
      var trand = Math.random() * 0.2 - 0.1;

      for (var j = 0; j < tailsCount; j++) {
        var pointX = trandWidth * i + trandWidth / tailsCount * j;
        pointY += Math.random() * 0.5 * trand * height / 2;
        if (pointY > height * 0.9 || pointY < height * 0.4) {
          trand *= -1
        }
        var point = new Phaser.Point(pointX, pointY)

        randomLine.push(point);
      }
    }

    var point = new Phaser.Point(width, pointY)
    randomLine.push(point);

    return randomLine;
}

function create() {
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.updateBoundsCollisionGroup()
    game.add.image(0, 0, 'sky')

    poly = new Phaser.Polygon();
    poly.setTo(
        gerPoygon()
            .concat([
                new Phaser.Point(width, height),
                new Phaser.Point(0, height)
            ])
    );

    game.tilepoly = game.add.tileSprite(0, 0, width, height, 'ground_tile');

    graphics = game.add.graphics(0, 0);

    graphics.beginFill(0x74B2E9, 1);
    graphics.drawPolygon(poly.points);
    graphics.endFill();

    game.tilepoly.mask = graphics;

	worm = game.add.sprite(32, 32, 'worm');
    ground = game.add.sprite(0, 0, 'ground');

    ground.width = width;
    ground.height = height;

    game.physics.p2.enable([worm, ground]);
    game.physics.p2.gravity.y = 1000;
    game.physics.p2.restitution = 0.2;
    game.physics.p2.setImpactEvents(true);

    worm.body.fixedRotation = true;
    worm.body.clearShapes();
    worm.scale.x = wormScale;
    worm.scale.y = wormScale;
    worm.body.loadPolygon('physics', 'worm', wormScale);

    ground.body.static = true;
    ground.body.fixedRotation = true;
    ground.body.clearShapes();

    var points = poly.toNumberArray();

    points.unshift({});

    ground.body.addPolygon.apply(ground.body, points);

    cursors = game.input.keyboard.createCursorKeys();

    groundCollisionGroup = game.physics.p2.createCollisionGroup();
    wormCollisionGroup = game.physics.p2.createCollisionGroup();
    bulletCollisionGroup = game.physics.p2.createCollisionGroup();

    setWormCollisions(worm)

    ground.body.setCollisionGroup(groundCollisionGroup);
    ground.body.collides([wormCollisionGroup, bulletCollisionGroup], landWorm, this);

    speechRecognizer = new WormsSpeachRecognizer(['рав', 'лев', 'прыж', 'прыг'])

    speechRecognizer.onResult(handleSpeechCommand)
    // setInterval(() => {speechRecognizer.start()}, 1000)
    speechRecognizer.start()

    var water = game.add.tileSprite(0, height * 0.9, width, height * 0.9, 'waters');

    water.animations.add('waves', [0, 1, 2, 3, 2, 1]);
    water.animations.play('waves', 8, true);
}

function handleSpeechCommand(command) {
    if (~command.indexOf('лев') || ~command.indexOf('Лего')) {
        moveLeft(worm, 300)
    }
    if (~command.indexOf('рав') || ~command.indexOf('рав')) {
        moveRight(worm, 300)
    }
    if (~command.indexOf('прыж') || ~command.indexOf('прыг')) {
        jump(worm)
    }
}

function setWormCollisions(worm) {
    worm.body.setCollisionGroup(wormCollisionGroup);
    worm.body.collides([groundCollisionGroup, wormCollisionGroup, bulletCollisionGroup]);
}

function landWorm() {
    worm._jumped = false
}

function jump(worm) {
    worm._jumped = true
    if (worm._moveDirection === MoveDirections.Right) {
        worm.body.moveRight(300)
    } else {
        worm.body.moveLeft(300)
    }
    worm.body.moveUp(300)
}

function moveLeft(worm, delta) {
    if (worm._jumped) {
        return
    }
    worm.body.moveLeft(delta);

    worm.loadTexture('worm');
    worm.body.clearShapes();
    worm.body.loadPolygon('physics', 'worm', wormScale);

    setWormCollisions(worm)

    worm._moveDirection = MoveDirections.Left
}

function moveRight(worm, delta) {
    if (worm._jumped) {
        return
    }
    worm.body.moveRight(delta);
    worm.loadTexture('worm_inverted');
    worm.body.clearShapes();
    worm.body.loadPolygon('physics', 'worm_inverted', wormScale);

    setWormCollisions(worm)

    worm._moveDirection = MoveDirections.Right
}

function update() {
	if (cursors.left.isDown) {
    	moveLeft(worm, 100)
        return
    }

    if (cursors.right.isDown) {
        moveRight(worm, 100)
        return;
    }

    if (cursors.up.isDown && !worm._jumped) {
        jump(worm)
    }
}

function fire (x, y, dx, dy) {
  var bullet = createBullet(game, {x: x, y: y}, { dx: dx, dy: dy });

  setTimeout(function () {
      bullet.mass = 2000;
      drawBoom(bullet.centerX, bullet.centerY);

      bullet.kill();
  }, 2000)
}

function createBullet (game, start, diff) {
  var sprite = game.add.sprite(worm.body.x, worm.body.y - 50, 'grenade');
  game.physics.p2.enable(sprite);
  sprite.scale.x = 0.2
  sprite.scale.y = 0.2
  sprite.body.clearShapes();
  sprite.body.loadPolygon('physics', 'grenade', 0.2);
  sprite.body.setCollisionGroup(bulletCollisionGroup);
  sprite.body.collides([groundCollisionGroup, wormCollisionGroup, bulletCollisionGroup]);


	sprite.body.fixedRotation = true;
  sprite.body.velocity.x = -diff.dx * 10;
  sprite.body.velocity.y = -diff.dy * 10;

  return sprite;
}

function drawBoom(x, y) {
    var emitter = game.add.emitter(x, y, 400);

    emitter.makeParticles(['fire1', 'fire2', 'fire3', 'smoke']);

    emitter.gravity = 100;
    emitter.setAlpha(1, 0, 3000);
    emitter.setScale(0.8, 0, 0.8, 0, 3000);

    emitter.start(false, 500, 5, 20);
}
