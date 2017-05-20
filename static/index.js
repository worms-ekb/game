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
var wormScale = .5;

function preload() {
	game.load.image('worm', 'assets/sprites/worm.png');
	game.load.image('worm_inverted', 'assets/sprites/worm_inverted.png');
	game.load.image('ground', 'assets/sprites/ground.gif');
	game.load.physics('physics', 'assets/physics.json');
}

function create() {
    game.physics.startSystem(Phaser.Physics.P2JS);

    poly = new Phaser.Polygon();
    var randomLine = [];
    var trandsCount = 4;
    var tailsCount = 20 ;
    var trandWidth = width / trandsCount;
    var pointY = (Math.random() * 0.5 + 0.4) * height;

    for(var i = 0; i <= trandsCount; i++) {
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

    poly.setTo(randomLine.concat([
      new Phaser.Point(width, height/2),
      new Phaser.Point(width, height),
      new Phaser.Point(0, height)
    ]));

    graphics = game.add.graphics(0, 0);

    graphics.beginFill(0xFF33ff);
    graphics.drawPolygon(poly.points);
    graphics.endFill();

	worm = game.add.sprite(32, 32, 'worm');
    ground = game.add.sprite(0, 0, 'ground');

    ground.width = width;
    ground.height = height;

    game.physics.p2.enable([worm, ground], true);
    game.physics.p2.gravity.y = 1000;
    game.physics.p2.restitution = 0.2;

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
}

function update() {
	if (cursors.left.isDown) {
    	worm.body.moveLeft(100);

        worm.loadTexture('worm');
        worm.body.clearShapes();
        worm.body.loadPolygon('physics', 'worm', wormScale);

        return;
    }

    if (cursors.right.isDown) {
    	worm.body.moveRight(100);

        worm.loadTexture('worm_inverted');
        worm.body.clearShapes();
        worm.body.loadPolygon('physics', 'worm_inverted', wormScale);

        return;
    }
}
