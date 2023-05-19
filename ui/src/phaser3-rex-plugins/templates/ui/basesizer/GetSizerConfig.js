import GetSizerConfig from '../utils/GetSizerConfig.js';

export default function (gameObject) {
    if (gameObject === undefined) {
        gameObject = this;
    }
    return GetSizerConfig(gameObject);
}