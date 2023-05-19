import EaseValueTask from '../../../../utils/ease/EaseValueTask.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

var DirMode = {
    out: 0,
    in: 1
}

export default {
    setTransitionDirection(dir) {
        if (typeof (dir) === 'string') {
            dir = DirMode[dir];
        }
        this.dir = dir;
        return this;
    },

    setDuration(duration) {
        this.duration = duration;
        return this;
    },

    setEaseFunction(ease) {
        this.easeFunction = ease;
        return this;
    },

    setNextTexture(texture, frame) {
        this.nextImage.setTexture(texture, frame);
        return this;
    },

    transit(texture, frame) {        
        if (this.isRunning) {
            this.ignoreCompleteEvent = true;
            this.stop();
            this.ignoreCompleteEvent = false;
        }

        if (IsPlainObject(texture)) {
            var config = texture;
            texture = GetValue(config, 'key', undefined);
            frame = GetValue(config, 'frame', undefined);

            this
                .setDuration(GetValue(config, 'duration', this.duration))
                .setEaseFunction(GetValue(config, 'ease', this.easeFunction))
                .setTransitionDirection(GetValue(config, 'dir', this.dir))

            var maskGameObject = GetValue(config, 'mask', undefined);
            if (maskGameObject) {
                this.setMaskGameObject(maskGameObject);
            }
            this.setMaskEnable(maskGameObject === true);

            var onStart = GetValue(config, 'onStart', undefined);
            var onProgress = GetValue(config, 'onProgress', undefined);
            var onComplete = GetValue(config, 'onComplete', undefined);
            if ((onStart !== undefined) || (onProgress !== undefined) || (onComplete !== undefined)) {
                this
                    .setTransitionStartCallback(
                        onStart,
                        GetValue(config, 'onStartScope', undefined)
                    )
                    .setTransitionProgressCallback(
                        onProgress,
                        GetValue(config, 'onProgressScope', undefined)
                    )
                    .setTransitionCompleteCallback(
                        onComplete,
                        GetValue(config, 'onCompleteScope', undefined)
                    )
            }
        }

        this.setNextTexture(texture, frame);

        this.start();
        return this;
    },

    start() {
        if (this.easeValueTask === undefined) {
            this.easeValueTask = new EaseValueTask(this, { eventEmitter: null })
        }
        this.easeValueTask.restart({
            key: 't', from: 0, to: 1,
            duration: this.duration,
            ease: this.easeFunction
        });
        return this;
    },

    pause() {
        if (this.easeValueTask) {
            this.easeValueTask.pause();
        }
        return this;
    },

    resume() {
        if (this.easeValueTask) {
            this.easeValueTask.resume();
        }
        return this;
    },

    stop() {
        if (this.easeValueTask) {
            this.easeValueTask.stop();
        }
        this.setT(1);
        return this;
    },
}