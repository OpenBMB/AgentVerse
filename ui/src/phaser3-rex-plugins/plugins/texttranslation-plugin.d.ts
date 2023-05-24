import TextTranslation from './texttranslation';
import { i18n, InitOptions } from 'i18next';
import { HttpBackendOptions } from 'i18next-http-backend';

export default TextTranslationPlugin;

declare namespace TextTranslationPlugin {
    interface CustomInitOptions extends InitOptions, HttpBackendOptions {

    }
}

declare class TextTranslationPlugin extends Phaser.Plugins.BasePlugin {
    i18next: i18n;

    initI18Next(
        scene: Phaser.Scene,
        config?: TextTranslationPlugin.CustomInitOptions
    ): this;

    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: TextTranslation.IConfig
    ): TextTranslation;

    changeLanguage(
        language: string,
        onComplete?: Function
    ): this;

    setDefaultNamespace(namespace: string): this;

    t(
        translationKey: string,
        interpolations?: { [name: string]: any }
    ): string

}