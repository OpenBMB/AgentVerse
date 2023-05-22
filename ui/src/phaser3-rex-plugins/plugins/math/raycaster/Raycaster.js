import Obstacles from './Obstacles.js';
import GetLineToPolygon from './GetLineToPolygon.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Line = Phaser.Geom.Line;
const SetToAngle = Phaser.Geom.Line.SetToAngle;
const ReflectAngle = Phaser.Geom.Line.ReflectAngle;

class Reflection {
    constructor(config) {
        this.obstacles = new Obstacles();
        this.ray = new Line();
        this.setMaxRayLength(GetValue(config, 'maxRayLength', 10000));
        this.result = {
            hit: false,
            x: 0, y: 0,
            segment: new Line(),
            polygon: null,
            gameObject: null,
            reflectAngle: 0
        };

    }

    destroy() {
        this.obstacles.clear();
        this.obstacles = null;
        this.ray = null;
        this.result = null;
    }

    setMaxRayLength(length) {
        this.maxRayLength = length;
        return this;
    }

    addObstacle(gameObject, polygon) {
        if (Array.isArray(gameObject)) {
            var gameObjects = gameObject;
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                this.obstacles.add(gameObjects[i]);
            }
        } else {
            this.obstacles.add(gameObject, polygon);
        }
        return this;
    }

    clearObstacle() {
        this.obstacles.clear();
        return this;
    }

    removeObstacle(gameObject) {
        if (Array.isArray(gameObject)) {
            var gameObjects = gameObject;
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                this.obstacles.remove(gameObjects[i]);
            }
        } else {
            this.obstacles.remove(gameObject);
        }
        return this;
    }

    updateObstacle(gameObject, polygon) {
        if (Array.isArray(gameObject)) {
            var gameObjects = gameObject;
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                this.obstacles.update(gameObjects[i]);
            }
        } else {
            this.obstacles.update(gameObject, polygon);
        }
        return this;
    }

    hitTest() {
        var result = GetLineToPolygon(this.ray, this.obstacles.polygons, true);
        if (result) {
            this.ray.x2 = result.x;
            this.ray.y2 = result.y;

            this.result.hit = true;
            this.result.x = result.x;
            this.result.y = result.y;

            var obstacle = this.obstacles.get(result.shapeIndex);
            this.result.polygon = obstacle.polygon;
            this.result.gameObject = obstacle.gameObject;

            var points = this.result.polygon.points,
                segIndex = result.segIndex,
                p0 = points[segIndex],
                p1 = points[segIndex + 1];
            var segment = this.result.segment;
            segment.setTo(p0.x, p0.y, p1.x, p1.y);
            this.result.reflectAngle = ReflectAngle(this.ray, segment);
        } else {
            this.result.hit = false;
        }
        return (result) ? this.result : false;
    }

    rayToward(x, y, angle) {
        SetToAngle(this.ray, x, y, angle, this.maxRayLength);
        return this.hitTest();
    }
}

export default Reflection;