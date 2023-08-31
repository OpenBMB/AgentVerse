import googleWebFontLoader from 'webfontloader';
import TestFont from './TestFont.js';

const FILE_POPULATED = Phaser.Loader.FILE_POPULATED;
const GetValue = Phaser.Utils.Objects.GetValue;

class WebFont extends Phaser.Loader.File {
    // constructor(loader, fileConfig) {
    //     super(loader, fileConfig);
    // }

    load() {
        if (this.state === FILE_POPULATED) {
            //  Can happen for example in a JSONFile if they've provided a JSON object instead of a URL
            this.loader.nextFile(this, true);
        } else {
            // start loading task
            var config = this.config;

            this.testString = GetValue(config, 'testString', undefined);
            if (this.testString !== undefined) {
                this.testInterval = GetValue(config, 'testInterval', 20);
                this.fontTests = {};
                delete config.testString;
                delete config.testInterval;
            }

            config.active = this.onLoad.bind(this);
            config.inactive = this.onError.bind(this);
            config.fontactive = this.onFontActive.bind(this);
            config.fontinactive = this.onFontInactive.bind(this);
            googleWebFontLoader.load(config);
        }
    }

    onLoad() {
        if (this.testString === undefined) {
            this.loader.nextFile(this, true);
        } else {
            var testFonts = (function () {
                if (this.testFonts()) {
                    this.loader.nextFile(this, true);
                } else {
                    setTimeout(testFonts, this.testInterval);
                }
            }).bind(this);
            testFonts();
        }
    }

    onError() {
        this.loader.nextFile(this, false);
    }

    onFontActive(familyName, fvd) {
        if (this.testString !== undefined) {
            var testString;
            if (typeof (this.testString) === 'string') {
                testString = this.testString;
            } else {
                testString = this.testString[familyName];
            }
            if (testString !== undefined) {
                this.fontTests[familyName] = testString;
            }
        }
        this.loader.emit('webfontactive', this, familyName, fvd);
    }

    onFontInactive(familyName, fvd) {
        this.loader.emit('webfontinactive', this, familyName, fvd);
    }

    testFonts() {
        var allPass = true;
        for (var familyName in this.fontTests) {
            if (TestFont(familyName, this.fontTests[familyName])) {
                delete this.fontTests[familyName];
            } else {
                allPass = false;
            }
        }

        return allPass;
    }
}

export default WebFont;