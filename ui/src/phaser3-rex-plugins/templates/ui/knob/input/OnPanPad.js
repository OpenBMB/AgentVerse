import IsLocalPointInKnob from './IsLocalPointInKnob.js';

const GetAngle = Phaser.Math.Angle.Between;
const WrapAngle = Phaser.Math.Angle.Wrap;

var OnPointerDown = function (pointer, localX, localY) {
    if ((!this.enable) || (this.panPointer)) {
        return;
    }
    var knob = this.sizerChildren.knob;
    if (!IsLocalPointInKnob(knob, localX, localY)) {
        return;
    }

    OnPanStart.call(this, pointer);
}

var OnPointerMove = function (pointer, localX, localY) {
    if (!this.enable) {
        return;
    }
    if (!pointer.isDown) {
        return;
    }

    var knob = this.sizerChildren.knob;
    switch (this.panState) {
        case TOUCH0:
            if (IsLocalPointInKnob(knob, localX, localY)) {
                OnPanStart.call(this, pointer);
            }
            break;

        case TOUCH1:
            if (IsLocalPointInKnob(knob, localX, localY)) {
                OnPan.call(this);
            } else {
                OnPanEnd.call(this);
            }
            break;
    }
}

var OnPointerUp = function (pointer, localX, localY) {
    if ((!this.enable) || (this.panPointer !== pointer)) {
        return;
    }

    OnPanEnd.call(this);
}

var OnPanStart = function (pointer) {
    this.panPointer = pointer;
    this.panState = TOUCH1;
}

var OnPanEnd = function () {
    this.panPointer = undefined;
    this.panState = TOUCH0;
}

var OnPan = function () {
    var p0 = this.panPointer.prevPosition,
        p1 = this.panPointer.position;
    var knob = this.sizerChildren.knob;
    var startAngle = GetAngle(knob.x, knob.y, p0.x, p0.y),
        endAngle = GetAngle(knob.x, knob.y, p1.x, p1.y);
    var deltaAngle = (knob.anticlockwise) ? (startAngle - endAngle) : (endAngle - startAngle);
    var deltaValue = WrapAngle(deltaAngle) / (Math.PI * 2);

    this.stopEaseValue();
    this.value += deltaValue;
}

const TOUCH0 = 0;
const TOUCH1 = 1;

var InstallEvents = function () {
    var knob = this.sizerChildren.knob;
    knob
        .on('pointerdown', OnPointerDown, this)
        .on('pointermove', OnPointerMove, this)
        .on('pointerup', OnPointerUp, this)
        .setInteractive()

    this.panPointer = undefined;
    this.panState = TOUCH0;
}

export default InstallEvents;