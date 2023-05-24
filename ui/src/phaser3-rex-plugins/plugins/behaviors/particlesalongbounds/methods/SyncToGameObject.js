const PreUpdate = Phaser.GameObjects.Particles.ParticleEmitter.prototype.preUpdate;
const GetValue = Phaser.Utils.Objects.GetValue;
const Vector2 = Phaser.Math.Vector2;

var SyncToGameObject = function (particles, gameObject, config) {
    var gravityX = GetValue(config, 'gravityX', 0);
    var gravityY = GetValue(config, 'gravityY', 0);
    var hasGravity = (gravityX !== 0) || (gravityY !== 0);

    // Override update, sync properties of particles to game object
    particles.preUpdate = (function (delta, step, processors) {
        if (!gameObject.scene) { // gameObject has been destroyed
            this.destroy();
            return;
        }

        // Sync to gameObject
        SyncTo.call(particles, gameObject);

        if (hasGravity) {
            var localGravityX, localGravityY;
            if (gameObject.rotation !== 0) {
                var gravityVector = new Vector2();
                gravityVector
                    .setTo(gravityX, gravityY)
                    .rotate(-gameObject.rotation);
                localGravityX = gravityVector.x;
                localGravityY = gravityVector.y;
            } else {
                localGravityX = gravityX;
                localGravityY = gravityY;
            }
            particles.setParticleGravity(localGravityX, localGravityY);
        }

        PreUpdate.call(particles, delta, step, processors);
    }).bind(particles);

    return particles;
}

var SyncTo = function (gameObject) {
    if (globPoint === undefined) {
        globPoint = { x: 0, y: 0 };
    }
    gameObject.getCenter(globPoint);
    this
        .setPosition(globPoint.x, globPoint.y)
        .setScale(gameObject.scaleX, gameObject.scaleY)
        .setAngle(gameObject.angle)
        .setAlpha(gameObject.alpha);

    if (this.depth !== gameObject.depth) {
        this.setDepth(gameObject.depth);
    }
}

var globPoint;

export default SyncToGameObject;