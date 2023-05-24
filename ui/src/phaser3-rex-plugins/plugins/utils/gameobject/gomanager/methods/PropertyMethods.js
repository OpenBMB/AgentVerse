export default {
    hasProperty(name, property) {
        if (!this.has(name)) {
            return false;
        }
        return this.get(name).hasProperty(property);
    },

    getProperty(name, property) {
        if (!this.has(name)) {
            return undefined;
        }
        return this.get(name).getProperty(property);
    },

    isNumberProperty(name, property) {
        var value = this.getProperty(name, property);
        return typeof (value) === 'number';
    },

    setProperty(name, property, value) {
        if (!this.has(name)) {
            return this;
        }

        if (this.symbols &&
            (typeof (value) === 'string') &&
            this.isNumberProperty(name, property)
        ) {
            if (value in this.symbols) {
                value = this.symbols[value];
            } else {
                console.warn(`Can't find symbol ${value}`)
            }
        }

        this.get(name).setProperty(property, value);
        return this;
    },

    easeProperty(name, property, value, duration, ease, repeat, isYoyo, onComplete) {
        if (!this.has(name)) {
            return this;
        }

        if (duration === undefined) {
            duration = 1000;
        }
        if (ease === undefined) {
            ease = 'Linear';
        }
        if (repeat === undefined) {
            repeat = 0;
        }
        if (isYoyo === undefined) {
            isYoyo = false;
        }

        if (this.symbols &&
            (typeof (value) === 'string') &&
            this.isNumberProperty(name, property)
        ) {
            if (value in this.symbols) {
                value = this.symbols[value];
            } else {
                console.warn(`Can't find symbol ${value}`)
            }
        }

        this.get(name).easeProperty(property, value, duration, ease, repeat, isYoyo, onComplete);
        return this;
    },

    hasTweenTask(name, property) {
        if (!this.has(name)) {
            return false;
        }

        var tweenTasks = this.get(name).tweens;
        return tweenTasks.hasOwnProperty(property);
    },

    getTweenTask(name, property) {
        if (!this.has(name)) {
            return null;
        }

        var tweenTasks = this.get(name).tweens;
        var tweenTask = tweenTasks[property];
        return (tweenTask) ? tweenTask : null;
    }
}