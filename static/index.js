var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'worms', { create: create });

var poly;
var graphics;

function create() {

    //  You can also create an empty Polygon:
    poly = new Phaser.Polygon();

    //  And then populate it via setTo, using any combination of values as above
    poly.setTo([ new Phaser.Point(200, 100), new Phaser.Point(350, 100), new Phaser.Point(375, 200), new Phaser.Point(150, 200) ]);



    graphics = game.add.graphics(0, 0);

    graphics.beginFill(0xFF33ff);
    graphics.drawPolygon(poly.points);
    graphics.endFill();

}
