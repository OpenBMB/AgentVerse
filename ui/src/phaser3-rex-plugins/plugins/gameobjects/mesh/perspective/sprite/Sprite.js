import PerspectiveImage from '../image/Image.js';

const AnimationState = Phaser.Animations.AnimationState;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class Sprite extends PerspectiveImage {
    constructor(scene, x, y, key, frame, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            key = GetValue(config, 'key', null);
            frame = GetValue(config, 'frame', null);
        }

        super(scene, x, y, key, frame, config);
        this.type = 'rexPerspectiveSprite';
        this.anims = new AnimationState(this);
    }

    preDestroy() {
        super.preDestroy();

        this.anims.destroy();
        this.anims = undefined;
    }

    preUpdate(time, delta) {
        var prevFrame = this.anims.currentFrame;
        this.anims.update(time, delta);
        if (this.anims.currentFrame !== prevFrame) {
            this.syncSize();
        }

        super.preUpdate(time, delta);
    }

    play(key, ignoreIfPlaying, startFrame) {
        return this.anims.play(key, ignoreIfPlaying, startFrame);
    }

    playReverse(key, ignoreIfPlaying) {
        return this.anims.playReverse(key, ignoreIfPlaying);
    }

    playAfterDelay(key, delay) {
        return this.anims.playAfterDelay(key, delay);
    }

    playAfterRepeat(key, repeatCount) {
        return this.anims.playAfterRepeat(key, repeatCount);
    }

    chain(key) {
        return this.anims.chain(key);
    }

    stop() {
        return this.anims.stop();
    }

    stopAfterDelay(delay) {
        return this.anims.stopAfterDelay(delay);
    }

    stopAfterRepeat(repeatCount) {
        return this.anims.stopAfterRepeat(repeatCount);
    }

    stopOnFrame(frame) {
        return this.anims.stopOnFrame(frame);
    }
}

export default Sprite;