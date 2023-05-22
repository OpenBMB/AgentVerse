import Input from './Input.js';

var SetInteractive = function (config) {
    // Input
    if (!this.input) {
        this.input = new Input(this, config);
    } else {
        var enable = (config === false) ? false : true;
        this.input.setEnable(enable);
    }

    return this;
};

export default SetInteractive;