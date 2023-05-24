import ComponentBase from '../ComponentBase.js';

class TweenTask extends ComponentBase {
    constructor(parent, config) {
        if (config === undefined) {
            config = {};
        }
        /*
        eventEmitter:
        - false(default value): Use tween's event emitter.
        - true: Create a private event emitter.
        */
        if (!config.hasOwnProperty('eventEmitter')) {
            config.eventEmitter = false;
        }
        super(parent, config);
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        this.stop();
        super.shutdown(fromScene);
    }

    start(tweenConfig) {
        if (this.isRunning) {
            return this;
        }

        this.tween = this.scene.tweens.add(tweenConfig)
            .on('complete', this.complete, this);
        if (this.getEventEmitter() === false) {
            this.setEventEmitter(this.tween);
        }
        return this;
    }

    restart(tweenConfig) {
        this.stop().start(tweenConfig);
        return this;
    }

    stop() {
        if (!this.tween) {
            return this;
        }

        if (this.getEventEmitter() === this.tween) {
            this.setEventEmitter(false);
        }
        this.tween.remove();
        this.tween = undefined;
        return this;
    }

    pause() {
        if (!this.tween) {
            return this;
        }
        this.tween.pause();
        return this;
    }

    resume() {
        if (!this.tween) {
            return this;
        }
        this.tween.resume();
        return this;
    }

    complete() {
        this.stop();
        if (this.getEventEmitter()) {
            this.emit('complete');
        }
        return this;
    }

    get isRunning() {
        return (!!this.tween);
    }
}

export default TweenTask;