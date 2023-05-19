import EventEmitterMethods from './utils/eventemitter/EventEmitterMethods.js';
import Awaitloader from './awaitloader.js';
import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import TextTranslation from './texttranslation.js';

class TextTranslationPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        // Event emitter
        this.setEventEmitter();

        this.i18next = i18next;
        TextTranslation.setI18Next(i18next);

        // Route 'languageChanged' event        
        this.onLanguageChanged = (function (lng) {
            this.emit('languageChanged', lng);
        }).bind(this);
        i18next.on('languageChanged', this.onLanguageChanged);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    destroy() {
        i18next.off('languageChanged', this.onLanguageChanged);

        super.destroy();

        this.destroyEventEmitter();
    }

    initI18Next(scene, config) {
        Awaitloader.call(scene.load, function (successCallback, failureCallback) {
            i18next.use(Backend).init(config, successCallback);
        })
        return this;
    }


    add(gameObject, config) {
        return new TextTranslation(gameObject, config);
    }

    changeLanguage(lng, onComplete) {
        i18next.changeLanguage(lng, onComplete);
        return this;
    }

    setDefaultNamespace(namespace) {
        i18next.setDefaultNamespace(namespace);
        return this;
    }

    t(translationKey, interpolation) {
        return i18next.t(translationKey, interpolation);
    }
}

Object.assign(
    TextTranslationPlugin.prototype,
    EventEmitterMethods
);

export default TextTranslationPlugin;