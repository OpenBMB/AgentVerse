import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import EaseValueTask from '../../utils/ease/EaseValueTask.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

class EaseData extends ComponentBase {
    constructor(parent, config) {
        super(parent, config);

        this.parent.setDataEnabled();
        this.easeTasks = {};
    }

    complete(key) {
        this.emit(`complete-${key}`, this.parent, this);
        this.emit('complete', key, this.parent, this);
    }

    getEaseTask(key) {
        var easeTask = this.easeTasks[key];
        if (easeTask === undefined) {
            easeTask = new EaseValueTask(this.parent);
            this.easeTasks[key] = easeTask;

            easeTask
                .setTarget(this.parent.data.values)
                .on('complete', function () {
                    this.complete(key);
                }, this);
        }
        return easeTask;
    }

    easeTo(key, value, duration, ease) {
        if (IsPlainObject(key)) {
            var config = key;
            key = config.key;
            value = config.value;
            duration = config.duration;
            ease = config.ease;

            var speed = config.speed;
            if ((duration === undefined) && (speed !== undefined)) {
                duration = (Math.abs(value - this.parent.data.values[key]) / speed) * 1000;
            }
        }

        if (duration === undefined) {
            duration = 1000;
        }
        if (ease === undefined) {
            ease = 'Linear';
        }

        var easeTask = this.getEaseTask(key);
        easeTask.restart({
            key: key,
            to: value,
            duration: duration,
            ease: ease
        });

        return this;
    }

    easeFrom(key, value, duration, ease) {
        if (IsPlainObject(key)) {
            var config = key;
            key = config.key;
            value = config.value;
            duration = config.duration;
            ease = config.ease;

            var speed = config.speed;
            if ((duration === undefined) && (speed !== undefined)) {
                duration = (Math.abs(value - this.parent.data.values[key]) / speed) * 1000;
            }
        }

        if (duration === undefined) {
            duration = 1000;
        }
        if (ease === undefined) {
            ease = 'Linear';
        }

        var easeTask = this.getEaseTask(key);
        easeTask.restart({
            key: key,
            from: value,
            duration: duration,
            ease: ease
        });

        return this;
    }

    stopEase(key, toEnd) {
        if (toEnd === undefined) {
            toEnd = true;
        }

        var easeTask = this.easeTasks[key];
        if (easeTask) {
            easeTask.stop(toEnd);
        }

        return this;
    }

    stopAll(toEnd) {
        if (toEnd === undefined) {
            toEnd = true;
        }

        for (var key in this.easeTasks) {
            this.stopEase(key, toEnd);
        }
        return this;
    }
}

export default EaseData;