import BoundsToPoints from './BoundsToPoints.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const TickTime = (1000 / 60);

var CreateEmitterConfig = function (gameObject, config) {
    var points = BoundsToPoints(gameObject, config);
    var emitterConfig = {
        blendMode: GetValue(config, 'blendMode', 'ADD'),
        emitZone: {
            type: 'edge',
            source: {
                getPoints: function () {
                    return points;
                }
            },
            yoyo: GetValue(config, 'yoyo', false)
        },
        speed: GetValue(config, 'spread', 10)
    };

    // Set lifespan
    var lifespan = GetValue(config, 'lifespan', 1000);
    emitterConfig.lifespan = lifespan;
    // Set quantity or frequency
    var duration = GetValue(config, 'duration', undefined);
    if (duration !== undefined) {
        var lastDelay = duration - lifespan;
        if (lastDelay <= 0) { // Fire all particles at beginning
            emitterConfig.quantity = points.length;
        } else {
            var delayPerParticle = lastDelay / points.length;
            if (delayPerParticle <= TickTime) { // Fire more then 1 particle per tick
                emitterConfig.quantity = Math.ceil(TickTime / delayPerParticle);
            } else { // Not fire 1 particle per tick, set frequency
                emitterConfig.frequency = delayPerParticle;
            }
        }
    }

    // stopAfter
    var repeat = 1 + GetValue(config, 'repeat', 0);
    var totalParticleCount = repeat * points.length;
    if (emitterConfig.hasOwnProperty('frequency')) {
        // Can't use 'stopAfter' in this case
        emitterConfig.emitCallback = function (particle, emitter) {
            totalParticleCount -= 1;
            if (totalParticleCount <= 0) {
                emitter.stop();
            }
        }
    } else {
        emitterConfig.stopAfter = totalParticleCount;
    }

    // Set texture frame
    var textureFrames = GetValue(config, 'textureFrames', undefined);
    if (textureFrames) {
        emitterConfig.frame = {
            frames: textureFrames,
            cycle: GetValue(config, 'textureFrameCycle', true)
        }
    }

    // Set scale
    var scale = GetValue(config, 'scale', undefined);
    if (scale !== undefined) {
        emitterConfig.scale = scale;
    }

    // Set alpha
    var alpha = GetValue(config, 'alpha', undefined);
    if (alpha !== undefined) {
        emitterConfig.alpha = alpha;
    }

    // Set tint
    var tint = GetValue(config, 'tint', undefined);
    if (tint !== undefined) {
        emitterConfig.tint = tint;
    }

    return emitterConfig;
}

export default CreateEmitterConfig;