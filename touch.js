class TouchControl {
  constructor(canvas, onDrag) {
    this.canvas = canvas;
    this.onDrag = onDrag;
    this.attachEvents();
  }
  attachEvents() {
    var x1, x2, y1, y2;

    this.canvas.addEventListener('touchstart', (e) => {
      const touches = e.changedTouches[0];
      x1 = touches.pageX;
      y1 = touches.pageY;
    })

    this.canvas.addEventListener('touchend', (e) => {
      const touches = e.changedTouches[0];
      x2 = touches.pageX;
      y2 = touches.pageY;

      const power = this._calcPower(x1, x2, y1, y2);
      const angle = this._calcAngle(x1, x2, y1, y2);

      this.onDrag(power, angle);
    })
  }

  _calcPower(x1, x2, y1, y2) {
    const len = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    const power = Math.max(Math.min(len/1000, 1), 0);

    return power;
  }

  _calcAngle(x1, x2, y1, y2) {
    return -Math.atan2(y1 - y2, x1 - x2);
  }
}
