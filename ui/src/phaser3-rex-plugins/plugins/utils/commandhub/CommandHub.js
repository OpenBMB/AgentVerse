import ComponentBase from '../componentbase/ComponentBase';

class CommandHub extends ComponentBase {
    addCommand(name, callback, scope) {
        if (this.hasOwnProperty(name)) {
            console.warn(`Command '${name}' has been added`);
        }
        this[name] = callback.bind(scope);
        return this;
    }

    runCommand(name, ...args) {
        if (!this.hasOwnProperty(name)) {
            return;
        }
        return this[name].apply(null, args);
    }

    addProperty(name, value) {
        if (this.hasOwnProperty(name)) {
            console.warn(`Property '${name}' has been added`);
        }
        this[name] = value;
        return this;
    }

    getProperty(name, defaultValue) {
        if (!this.hasOwnProperty(name)) {
            return defaultValue;
        }
        return this[name];
    }

}

export default CommandHub;