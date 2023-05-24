import MonitorViewport from './MonitorViewport.js';
import VPXYToXY from './VPXYToXY.js';

var AddViewportCoordinateProperties = function (gameObject, viewport, vpx, vpy, vpxOffset, vpyOffset, transformCallback) {
    // Don't attach properties again
    if (gameObject.hasOwnProperty('vp')) {
        return gameObject;
    }

    if (typeof (vpx) === 'function') {
        transformCallback = vpx;
        vpx = undefined;
    }

    if (typeof (vpxOffset) === 'function') {
        transformCallback = vpxOffset;
        vpxOffset = undefined;
    }


    if (vpx === undefined) { vpx = 0.5; }
    if (vpy === undefined) { vpy = 0.5; }
    if (vpxOffset === undefined) { vpxOffset = 0; }
    if (vpyOffset === undefined) { vpyOffset = 0; }

    if (transformCallback === undefined) {
        transformCallback = VPXYToXY;
    }

    MonitorViewport(viewport);
    var events = viewport.events;

    gameObject.vp = viewport;

    // Set position of game object when view-port changed.
    var Transform = function () {
        transformCallback(vpx, vpy, vpxOffset, vpyOffset, viewport, gameObject);
    }

    events.on('update', Transform);
    gameObject.once('destroy', function () {
        events.off('update', Transform);
        gameObject.vp = undefined;
    })

    Object.defineProperty(gameObject, 'vpx', {
        get: function () {
            return vpx;
        },
        set: function (value) {
            if (vpx !== value) {
                vpx = value;
                Transform();
            }
        },
    });

    Object.defineProperty(gameObject, 'vpy', {
        get: function () {
            return vpy;
        },
        set: function (value) {
            if (vpy !== value) {
                vpy = value;
                Transform();
            }
        },
    });

    Object.defineProperty(gameObject, 'vpxOffset', {
        get: function () {
            return vpxOffset;
        },
        set: function (value) {
            if (vpxOffset !== value) {
                vpxOffset = value;
                Transform();
            }
        },
    });

    Object.defineProperty(gameObject, 'vpyOffset', {
        get: function () {
            return vpyOffset;
        },
        set: function (value) {
            if (vpyOffset !== value) {
                vpyOffset = value;
                Transform();
            }
        },
    });

    Transform();
}

export default AddViewportCoordinateProperties;