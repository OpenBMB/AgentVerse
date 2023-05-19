import GetTickDelta from '../../../utils/system/GetTickDelta.js';

const DistanceBetween = Phaser.Math.Distance.Between;
const AngleBetween = Phaser.Math.Angle.Between;

export default {
    getDt: function () {
        var dt = GetTickDelta(this.scene);
        return dt;
    },

    getVelocity: function () {
        var p1 = this.pointer.position;
        var p0 = this.pointer.prevPosition;
        var d = DistanceBetween(p0.x, p0.y, p1.x, p1.y);
        var velocity = d / (this.getDt() * 0.001);
        return velocity;
    },

    getVelocityX: function () {
        var p1 = this.pointer.position;
        var p0 = this.pointer.prevPosition;
        var d = Math.abs(p1.x - p0.x);
        var velocity = d / (this.getDt() * 0.001);
        return velocity;
    },

    getVelocityY: function () {
        var p1 = this.pointer.position;
        var p0 = this.pointer.prevPosition;
        var d = Math.abs(p1.y - p0.y);
        var velocity = d / (this.getDt() * 0.001);
        return velocity;
    },

    getVelocityAngle: function () {
        var p1 = this.pointer.position;
        var p0 = this.pointer.prevPosition;
        var angle = AngleBetween(p0.x, p0.y, p1.x, p1.y);
        return angle;
    }
};