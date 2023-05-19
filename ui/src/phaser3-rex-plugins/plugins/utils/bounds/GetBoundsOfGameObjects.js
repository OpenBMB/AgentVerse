import { GetBounds } from './GetBounds.js';

const Rectangle = Phaser.Geom.Rectangle;
const Union = Phaser.Geom.Rectangle.Union;

var GetBoundsOfGameObjects = function (gameObjects, out) {
    if (out === undefined) {
        out = new Rectangle();
    } else if (out === true) {
        if (GlobRect === undefined) {
            GlobRect = new Rectangle();
        }
        out = GlobRect;
    }

    out.setTo(0, 0, 0, 0);

    var gameObject;
    var firstClone = true;
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        gameObject = gameObjects[i];
        if (!gameObject.getBounds) {
            continue;
        }

        var boundsRect = GetBounds(gameObject, true);

        if (firstClone) {
            out.setTo(boundsRect.x, boundsRect.y, boundsRect.width, boundsRect.height);
            firstClone = false;
        } else {
            Union(boundsRect, out, out);
        }
    }

    return out;
}

var GlobRect;

export default GetBoundsOfGameObjects;