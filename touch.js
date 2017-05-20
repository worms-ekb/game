const Rx = require('rxjs')

class TouchControl {
  constructor(canvas) {
    this.touchStart$ = Rx.Observable.fromEvent(canvas, 'touchstart')
    this.touchEnd$ = Rx.Observable.fromEvent(canvas, 'touchend')
    this.onDrag = this.onDrag.bind(this)
  }

  onDrag(handler) {
    var a = this.touchStart$
      .first()
      .merge(this.touchEnd$.first())
      .map(({ changedTouches }) => [
        changedTouches[0].pageX,
        changedTouches[0].pageY
      ])
      .scan((a, b) => a.concat([b]), [])
      .last()
      .subscribe(
        ([start, end]) => {
          handler(getPower(start, end), getAngle(start, end))
        },
        () => {},
        () => {
          this.onDrag(handler)
        }
      )
  }
}

function getPower([x1, y1], [x2, y2]) {
  const len = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
  const power = Math.max(Math.min(len / 1000, 1), 0)
  return power
}

function getAngle([x1, y1], [x2, y2]) {
  return -Math.atan2(y1 - y2, x1 - x2)
}
