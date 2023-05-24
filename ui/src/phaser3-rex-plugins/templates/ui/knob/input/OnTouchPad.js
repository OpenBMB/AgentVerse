import IsLocalPointInKnob from './IsLocalPointInKnob.js';

const GetAngle = Phaser.Math.Angle.Between;
const NormalizeAngle = Phaser.Math.Angle.Normalize;

var OnTouchPad = function (pointer, localX, localY) {
    if (!this.enable) {
        return;
    }
    if (!pointer.isDown) {
        return;
    }
    var knob = this.sizerChildren.knob;
    if (!IsLocalPointInKnob(knob, localX, localY)) {
        return;
    }

    var centerX = knob.width / 2;
    var startAngle = knob.startAngle;
    var endAngle = GetAngle(centerX, centerX, localX, localY);
    var deltaAngle = (knob.anticlockwise) ? (startAngle - endAngle) : (endAngle - startAngle);
    var value = NormalizeAngle(deltaAngle) / (2 * Math.PI);

    this.stopEaseValue();
    if ((this.easeValueDuration === 0) || (Math.abs(this.value - value) < 0.1)) {
        this.value = value;
    } else {
        this.easeValueTo(value);
    }
}

var InstallEvents = function () {
    var knob = this.sizerChildren.knob;
    knob
        .on('pointerdown', OnTouchPad, this)
        .on('pointermove', OnTouchPad, this)
        .setInteractive()
}

export default InstallEvents;