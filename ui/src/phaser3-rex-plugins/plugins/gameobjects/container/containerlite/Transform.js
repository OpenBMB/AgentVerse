const RotateAround = Phaser.Math.RotateAround;

export default {
    worldToLocal(point) {
        // Transform
        point.x -= this.x;
        point.y -= this.y;
        // Rotate
        RotateAround(point, 0, 0, -this.rotation);
        // Scale
        point.x /= this.scaleX;
        point.y /= this.scaleY;
        return point;
    },

    localToWorld(point) {
        // Scale
        point.x *= this.scaleX;
        point.y *= this.scaleY;
        // Rotate
        RotateAround(point, 0, 0, this.rotation);
        // Transform
        point.x += this.x;
        point.y += this.y;
        return point;
    }
};