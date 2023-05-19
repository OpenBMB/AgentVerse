const EventEmitter = Phaser.Events.EventEmitter;

var MonitorViewport = function (viewport) {
    if (viewport.events) {
        return viewport;
    }

    var events = new EventEmitter();

    var x = viewport.x;
    Object.defineProperty(viewport, 'x', {
        get: function () {
            return x;
        },

        set: function (value) {
            if (x !== value) {
                x = value;
                events.emit('update', viewport);
            }
        },
    });

    var y = viewport.y;
    Object.defineProperty(viewport, 'y', {
        get: function () {
            return y;
        },

        set: function (value) {
            if (y !== value) {
                y = value;
                events.emit('update', viewport);
            }
        },
    });

    var width = viewport.width;
    Object.defineProperty(viewport, 'width', {
        get: function () {
            return width;
        },

        set: function (value) {
            if (width !== value) {
                width = value;
                events.emit('update', viewport);
            }
        },
    });

    var height = viewport.height;
    Object.defineProperty(viewport, 'height', {
        get: function () {
            return height;
        },

        set: function (value) {
            if (height !== value) {
                height = value;
                events.emit('update', viewport);
            }
        },
    });

    viewport.events = events;

    return viewport;
}

export default MonitorViewport;