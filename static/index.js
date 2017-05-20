var width = window.innerWidth
var height = window.innerHeight

var game = new Phaser.Game(width, height, Phaser.CANVAS, 'worms', { create: create });

var poly;
var graphics;

function create() {
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

}
