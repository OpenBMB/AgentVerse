import ParseYAML from './utils/ParseYAML.js';
import YAMLMake from './YAMLMake.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

class Maker {
    constructor(scene, styles, customBuilders) {
        this.setScene(scene);
        this.setStyles(styles);
        this.setBuilders(customBuilders);
    }

    setScene(scene) {
        this.scene = scene;
        return this;
    }

    setStyles(styles) {
        this.styles = ParseYAML(styles);
        return this;
    }

    addStyle(key, style) {
        if (this.styles === undefined) {
            this.styles = {};
        }

        if ((typeof (key) === 'string') && (style === undefined)) {
            key = ParseYAML(key);
        }

        if (IsPlainObject(key)) {
            var styles = key;
            for (key in styles) {
                this.styles[key] = styles[key];
            }
        } else {
            this.styles[key] = ParseYAML(style);
        }

        return this;
    }

    clearStyles() {
        this.setStyles();
        return this;
    }

    setBuilders(customBuilders) {
        this.customBuilders = customBuilders;
        return this;
    }

    addBuilder(key, customBuilder) {
        if (this.customBuilders === undefined) {
            this.customBuilders = {};
        }

        if (IsPlainObject(key)) {
            var customBuilders = key;
            for (key in customBuilders) {
                this.customBuilders[key] = customBuilders[key];
            }
        } else {
            this.customBuilders[key] = customBuilder;
        }
        return this;
    }

    clearBuilder() {
        this.setBuilders();
        return this;
    }

    make(data, view) {
        return YAMLMake(this.scene, data, view, this.styles, this.customBuilders);
    }
}

export default Maker;