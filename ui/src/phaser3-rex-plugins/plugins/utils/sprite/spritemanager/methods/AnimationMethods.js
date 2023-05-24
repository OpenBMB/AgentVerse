export default {
    playAnimation(name, key) {
        if (!this.has(name)) {
            this.add(name);
        }

        this.get(name).playAnimation(key);
        return this;
    },

    stopAnimation(name) {
        if (!this.has(name)) {
            return this;
        }

        this.get(name).stopAnimation();
        return this;
    },

    chainAnimation(name, keys) {
        if (!this.has(name)) {
            return this;
        }

        this.get(name).chainAnimation(keys);
        return this;
    },

    pauseAnimation(name) {
        if (!this.has(name)) {
            return this;
        }

        this.get(name).pauseAnimation();
        return this;
    },
}