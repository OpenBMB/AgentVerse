const Vector2 = Phaser.Math.Vector2;
class SpeedMonitor {
    constructor() {
        this.position = new Vector2();
        this.velocity = new Vector2();
    }

    init(x, y) {
        this.velocity.reset();
        this.position.set(x, y);
        return this;
    }

    update(x, y, delta) {
        // delta in sec
        this.velocity.set(
            x - this.position.x,
            y - this.position.y
        );
        if ((this.velocity.x !== 0) || (this.velocity.y !== 0)) {
            this.velocity.setToPolar(
                this.velocity.angle(),
                this.velocity.length() / delta
            );
        }
        this.position.set(x, y);
        return this;
    }
};

export default SpeedMonitor;