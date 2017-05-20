function initTouch() {
    var start, end;
    clear();

    window.addEventListener('touchstart', evt => {
        handleTouch(start, evt)
    }, false);
    window.addEventListener('touchend', evt => {
        handleTouch(end, evt);

        fire(start.x, start.y, end.x - start.x, end.y - start.y);
        clear();
    }, false);
    window.addEventListener('touchcancel', clear, false);

    function handleTouch(point, evt) {
        evt.preventDefault();

        var touch = evt.changedTouches[0];

        point.x = touch.pageX;
        point.y = touch.pageY;
    }

    function clear() {
        start = { x: 0, y: 0 };
        end = { x: 0, y: 0 };
    }
}

initTouch();
