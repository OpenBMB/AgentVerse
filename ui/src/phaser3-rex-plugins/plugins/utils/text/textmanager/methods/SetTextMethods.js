export default {
    clearText(name) {
        if (!this.has(name)) {
            return this;
        }

        this.get(name).clearText();
        return this;
    },

    appendText(name, text) {
        if (!this.has(name)) {
            return this;
        }

        this.get(name).appendText(text);
        return this;
    },

    clearTyping(name) {
        if (!this.has(name)) {
            return this;
        }

        this.get(name).clearTyping();
        return this;
    },

    typing(name, text) {
        if (!this.has(name)) {
            return this;
        }

        this.get(name).typing(text);
        return this;
    },

    appendTyping(name, text) {
        if (!this.has(name)) {
            return this;
        }

        this.get(name).appendTyping(text);
        return this;
    },

    setTypingSpeed(name, speed) {
        if (!this.has(name)) {
            return this;
        }

        this.get(name).setTypingSpeed(speed);
        return this;
    },
}