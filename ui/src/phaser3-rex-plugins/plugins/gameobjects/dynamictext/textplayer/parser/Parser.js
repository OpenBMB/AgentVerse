import BracketParser from '../../../../bracketparser.js';
import AddParseCallbacks from './AddParseCallbacks.js';
import PreProcessSource from './PreProcessSource.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Parser extends BracketParser {
    constructor(textPlayer, config) {
        if (config === undefined) {
            config = {};
        }
        if (!config.hasOwnProperty('delimiters')) {
            config.delimiters = '[]';
        }
        super(config);

        AddParseCallbacks(textPlayer, this, config);

        this.setCommentLineStartSymbol(GetValue(config, 'comment', '//'));
        this.setContentOutputEnable();
    }

    setCommentLineStartSymbol(symbol) {
        this.commentLineStart = symbol;
        return this;
    }

    setContentOutputEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.contentOutputEnable = enable;
        return this;
    }

    start(source) {
        super.start(PreProcessSource(this, source));
        return this;
    }
}

export default Parser;