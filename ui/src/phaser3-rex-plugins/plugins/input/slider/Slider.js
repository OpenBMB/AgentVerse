import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import ProgressValueMethods from '../../utils/progressvalue/ProgressValueMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const BetweenPoints = Phaser.Math.Angle.BetweenPoints;
const DistanceBetween = Phaser.Math.Distance.Between;
const RotateAroundDistance = Phaser.Math.RotateAroundDistance;
const Clamp = Phaser.Math.Clamp;
const Linear = Phaser.Math.Linear;
const Percent = Phaser.Math.Percent;

class Slider extends ComponentBase {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;

        this._enable = undefined;
        this._value = undefined;
        this.endPoints = [
            { x: 0, y: 0 },
            { x: 0, y: 0 }
        ];

        var callback = GetValue(config, 'valuechangeCallback', null);
        if (callback !== null) {
            var scope = GetValue(config, 'valuechangeCallbackScope', undefined);
            this.on('valuechange', callback, scope);
        }

        this.parent.setInteractive(GetValue(config, "inputConfig", undefined));
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.setValue(GetValue(o, "value", 0));
        var endPoints = GetValue(o, "endPoints", undefined);
        if (endPoints !== undefined) {
            this.setEndPoints(endPoints);
        }
        this.setEnable(GetValue(o, "enable", true));
        return this;
    }

    toJSON() {
        return {
            value: this.value,
            endPoints: this.endPoints,
            enable: this.enable
        };
    }

    boot() {
        this.parent.on('drag', this.onDragging, this);
    }

    // shutdown(fromScene) {
    //     // Already shutdown
    //     if (this.isShutdown) {
    //         return;
    //     }
    //     // GameObject events will be removed when this gameObject destroyed 
    //     // this.parent.off('drag', this.onDragging, this);
    //     super.shutdown(fromScene);
    // }

    get enable() {
        return this._enable;
    }

    set enable(e) {
        if (this._enable === e) {
            return;
        }

        this._enable = e;
        this.scene.input.setDraggable(this.parent, e);
        return this;
    }

    setEnable(e) {
        if (e === undefined) {
            e = true;
        }

        this.enable = e;
        return this;
    }

    toggleEnable() {
        this.setEnable(!this.enable);
        return this;
    }

    setEndPoints(p0x, p0y, p1x, p1y) {
        var points = this.endPoints;
        if (typeof (p0x) === 'number') {
            points[0].x = p0x;
            points[0].y = p0y;
            points[1].x = p1x;
            points[1].y = p1y;
        } else if (Array.isArray(p0x)) { // single array with 2 points
            points[0] = p0x[0];
            points[1] = p0x[1];
        } else {
            points[0] = p0x;
            points[1] = p0y;
        }
        this.axisRotation = BetweenPoints(points[0], points[1]);
        this.updatePos();
        return this;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        value = Clamp(value, 0, 1);
        if (value === this._value) {
            return;
        }

        var oldValue = this._value;
        this._value = value
        this.updatePos(this._value);
        this.emit('valuechange', this._value, oldValue);
    }

    get isDragging() {
        return (this.parent.input.dragState > 0);
    }

    onDragging(pointer, dragX, dragY) {
        var endPoints = this.endPoints;
        var newValue;
        if (endPoints[0].y === endPoints[1].y) {
            var min = Math.min(endPoints[0].x, endPoints[1].x);
            var max = Math.max(endPoints[0].x, endPoints[1].x);
            newValue = Percent(dragX, min, max);
        } else if (endPoints[0].x === endPoints[1].x) {
            var min = Math.min(endPoints[0].y, endPoints[1].y);
            var max = Math.max(endPoints[0].y, endPoints[1].y);
            newValue = Percent(dragY, min, max);
        } else {
            var gameObject = this.parent;
            var dist;
            var p1 = { x: dragX, y: dragY };

            dist = DistanceBetween(p1.x, p1.y, gameObject.x, gameObject.y);
            p1 = RotateAroundDistance(p1, gameObject.x, gameObject.y, -this.axisRotation, dist);
            p1.y = gameObject.y;
            dist = DistanceBetween(p1.x, p1.y, gameObject.x, gameObject.y);
            p1 = RotateAroundDistance(p1, gameObject.x, gameObject.y, this.axisRotation, dist);

            var min = Math.min(endPoints[0].x, endPoints[1].x);
            var max = Math.max(endPoints[0].x, endPoints[1].x);
            newValue = Percent(p1.x, min, max);
        }

        this.value = newValue;
    }

    updatePos() {
        var gameObject = this.parent;
        var points = this.endPoints;
        gameObject.x = Linear(points[0].x, points[1].x, this._value);
        gameObject.y = Linear(points[0].y, points[1].y, this._value);
        return this;
    }
}

Object.assign(
    Slider.prototype,
    ProgressValueMethods,
)

export default Slider;