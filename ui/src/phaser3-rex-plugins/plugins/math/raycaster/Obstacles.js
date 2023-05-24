import IsGameObject from '../../utils/system/IsGameObject.js';
import BoundsToPolygon from '../../utils/bounds/BoundsToPolygon.js';

const Polygon = Phaser.Geom.Polygon;
const SpliceOne = Phaser.Utils.Array.SpliceOne;

class Obstacles {
    constructor() {
        this.gameObjects = [];
        this.polygons = [];
    }

    contains(gameObject) {
        return (this.gameObjects.indexOf(gameObject) !== (-1));
    }

    get(index) {
        Obstacle.gameObject = this.gameObjects[index];
        Obstacle.polygon = this.polygons[index];
        return Obstacle;
    }

    addDestroyCallback(gameObject) {
        if (Array.isArray(gameObject)) {
            var gameObjects = gameObject;
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                this.addDestroyCallback(gameObjects[i]);
            }
            return this;
        }

        if (gameObject.on) {
            gameObject.once('destroy', this.onChildDestroy, this);
        }
        return this;
    }

    removeDestroyCallback(gameObject) {
        if (Array.isArray(gameObject)) {
            var gameObjects = gameObject;
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                this.removeDestroyCallback(gameObjects[i]);
            }
            return this;
        }

        if (gameObject.off) {
            gameObject.off('destroy', this.onChildDestroy, this);
        }
        return this;
    }

    clear() {
        this.removeDestroyCallback(this.gameObjects);
        this.gameObjects.length = 0;
        this.polygons.length = 0;
        return this;
    }

    add(gameObject, polygon) {
        if (this.contains(gameObject)) {
            return this;
        }

        if (IsGameObject(gameObject)) {
            if (polygon === undefined) {
                polygon = BoundsToPolygon(gameObject);
            }
        } else if (gameObject instanceof (Polygon)) {
            polygon = gameObject;
        }

        this.gameObjects.push(gameObject);
        this.polygons.push(polygon);

        this.addDestroyCallback(gameObject);
        return this;
    }

    remove(gameObject) {
        var index = this.gameObjects.indexOf(gameObject);
        if (index === (-1)) {
            return this;
        }

        SpliceOne(this.gameObjects, index);
        SpliceOne(this.polygons, index);

        this.removeDestroyCallback(gameObject);
        return this;
    }

    onChildDestroy(child, fromScene) {
        this.remove(child);
    }

    update(gameObject, polygon) {
        var index = this.gameObjects.indexOf(gameObject);
        if (index === (-1)) {
            return this;
        }
        if (polygon === undefined) {
            polygon = BoundsToPolygon(gameObject, this.polygons[index]);
        }
        this.polygons[index] = polygon;
        return this;
    }
}

var Obstacle = {};

export default Obstacles;
