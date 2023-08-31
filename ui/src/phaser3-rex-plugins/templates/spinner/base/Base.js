import BaseShapes from '../../../plugins/gameobjects/shape/shapes/BaseShapes.js';
import EaseValueMethods from './EaseValueMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Base extends BaseShapes {
    constructor(scene, config) {
        var x = GetValue(config, 'x', 0);
        var y = GetValue(config, 'y', 0);
        var width = GetValue(config, 'width', 64);
        var height = GetValue(config, 'height', 64);

        super(scene, x, y, width, height);

        this.setDuration(GetValue(config, 'duration', 1000));
        this.setEase(GetValue(config, 'ease', 'Linear'));
        this.setDelay(GetValue(config, 'delay', 0));
        this.setRepeatDelay(GetValue(config, 'repeatDelay', 0));
        var color = GetValue(config, 'color', 0xffffff);
        var start = GetValue(config, 'start', true);

        this.buildShapes(config);
        this.setColor(color);
        this.setValue(0);

        if (start) {
            this.start();
        }
    }

    buildShapes() {

    }

    get centerX() {
        return this.width / 2;;
    }

    get centerY() {
        return this.height / 2;
    }

    get radius() {
        return Math.min(this.centerX, this.centerY);
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this.isColorChanged = this.isColorChanged || (this._color !== value);
        this.dirty = this.dirty || this.isColorChanged;
        this._color = value;
        this.setShapesColor(value);
    }

    setColor(color) {
        this.color = color;
        return this;
    }

    setShapesColor(color) {

    }

    get value() {
        return this._value;
    }

    set value(value) {
        value = Phaser.Math.Clamp(value, 0, 1);
        this.dirty = this.dirty || (this._value != value);
        this._value = value;
    }

    setValue(value) {
        this.value = value;
        return this;
    }

    setDuration(duration) {
        this.duration = duration;
        return this;
    }

    setDelay(delay) {
        this.delay = delay;
        return this;
    }

    setRepeatDelay(repeatDelay) {
        this.repeatDelay = repeatDelay;
        return this;
    }

    setEase(ease) {
        this.ease = ease;
        return this;
    }

    get isRunning() {
        return (this.tweenTask) ? this.tweenTask.isRunning : false;
    }
}

Object.assign(
    Base.prototype,
    EaseValueMethods
);

export default Base;