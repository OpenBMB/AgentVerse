import ComponentBase from '../../utils/componentbase/ComponentBase.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Vector2 = Phaser.Math.Vector2;
const DegToRad = Phaser.Math.DegToRad;
const AngleBetween = Phaser.Math.Angle.Between;
const Linear = Phaser.Math.Linear;

class PathFollower extends ComponentBase {
    constructor(gameObject, config) {
        super(gameObject, { eventEmitter: false });
        // No event emitter
        // this.parent = gameObject;

        this._t = 0;
        this.pathVector = new Vector2();
        this.spacePoints = undefined;
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setPath(GetValue(o, 'path', undefined));

        var rotateToPath = GetValue(o, 'rotateToPath', false);
        var rotationOffset = GetValue(o, 'rotationOffset', undefined);
        if (rotationOffset === undefined) {
            rotationOffset = DegToRad(GetValue(o, 'angleOffset', 0));
        }
        this.setRotateToPath(rotateToPath, rotationOffset);

        var spacedPoints = GetValue(o, 'spacedPoints', false);
        if (spacedPoints) {
            this.setSpacedPointsMode(
                GetValue(spacedPoints, 'divisions', undefined),
                GetValue(spacedPoints, 'stepRate', 10)
            )
        } else {
            this.setSpacedPointsMode(false);
        }

        var t = GetValue(o, 't', undefined);
        if (t !== undefined) {
            this.setT(t);
        }
        return this;
    }

    toJSON() {
        return {
            path: this.path,
            t: this.t,
            rotateToPath: this.rotateToPath,
            rotationOffset: this.rotationOffset
        };
    }

    setPath(path) {
        this.path = path;
        return this;
    }

    setT(t) {
        this.t = t;
        return this;
    }

    get t() {
        return this._t;
    }

    set t(value) {
        this._t = value;
        this.update();
    }

    setRotateToPath(rotateToPath, rotationOffset) {
        this.rotateToPath = rotateToPath;
        this.rotationOffset = rotationOffset;
        return this;
    }

    setSpacedPointsMode(divisions, stepRate) {
        if ((!divisions) && (!stepRate)) {
            this.spacePoints = undefined;
        } else {
            this.spacePoints = this.path.getSpacedPoints(divisions, stepRate, this.spacePoints);
            // Add point at t=1
            this.spacePoints.push(this.path.getPoint(1));
        }
        return this;
    }

    getPoint(t) {
        if (this.spacePoints === undefined) {
            return this.path.getPoint(this.t, this.pathVector);

        } else {
            var start = (this.spacePoints.length - 1) * t;
            var index = Math.floor(start);
            var p0 = this.spacePoints[index],
                p1 = this.spacePoints[index + 1];
            if (!p1) {
                this.pathVector.x = p0.x;
                this.pathVector.y = p0.y;
            } else {
                var remainderT = start - index;
                this.pathVector.x = Linear(p0.x, p1.x, remainderT);
                this.pathVector.y = Linear(p0.y, p1.y, remainderT);
            }
            return this.pathVector;
        }
    }

    update() {
        if (this.path === undefined) {
            return;
        }

        var gameObject = this.parent;
        var curX = gameObject.x,
            curY = gameObject.y;
        this.pathVector = this.getPoint(this._t);
        var newX = this.pathVector.x,
            newY = this.pathVector.y;

        if ((curX === newX) && (curY === newY)) {
            return;
        }

        gameObject.setPosition(newX, newY);
        if (this.rotateToPath) {
            gameObject.rotation = AngleBetween(curX, curY, newX, newY) + this.rotationOffset;
        }
    }
}

export default PathFollower;
