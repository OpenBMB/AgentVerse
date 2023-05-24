import CreateEmitterConfig from './methods/CreateEmitterConfig.js';
import SyncToGameObject from './methods/SyncToGameObject.js';

var ParticlesAlongBounds = function (gameObject, config) {
    if (config === undefined) {
        config = {};
    }

    var emitterConfig = CreateEmitterConfig(gameObject, config);
    var particles = gameObject.scene.add.particles(0, 0, config.textureKey, emitterConfig);
    SyncToGameObject(particles, gameObject, config);

    particles.once('complete', function () {
        particles.destroy();
    });

    return particles;
}

export default ParticlesAlongBounds;