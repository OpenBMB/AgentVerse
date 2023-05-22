import TextManager from '../../../../../utils/text/textmanager/TextManager.js';
import OnParseSetTextTag from './OnParseSetTextTag.js';
import OnParseTypingTextTag from './OnParseTypingTextTag.js';

const ParseCallbacks = [
    OnParseSetTextTag,
    OnParseTypingTextTag
];

var AddTextManager = function (config) {
    if (config === undefined) {
        config = {};
    }
    config.name = 'text';
    config.parseCallbacks = ParseCallbacks;
    this.addGameObjectManager(config, TextManager);
}

export default AddTextManager;