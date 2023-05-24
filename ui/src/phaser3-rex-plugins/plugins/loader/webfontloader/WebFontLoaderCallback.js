import WebFont from './WebFont.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

const loaderCallback = function (key, config) {
    if (IsPlainObject(key)) {
        config = key;
        if (config.hasOwnProperty('config')) {
            config.type = 'webfont';
            config.url = '';
        } else {
            config = {
                key: 'webfont',
                type: 'webfont',
                url: '',
                config: config
            };
        }
    } else {
        config = {
            type: 'webfont',
            url: '',
            key: key,
            config: config
        };
    }
    this.addFile(new WebFont(this, config));

    return this;
}

export default loaderCallback;