import BracketParser from '../../bracketparser/BracketParser.js';
import AddParseCallbacks from './AddParseCallbacks.js';
import PreProcessSource from './PreProcessSource.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Parser extends BracketParser {
    constructor(tagPlayer, config) {
        if (config === undefined) {
            config = {};
        }
        if (!config.hasOwnProperty('delimiters')) {
            config.delimiters = '[]';
        }
        super(config);

        AddParseCallbacks(tagPlayer, this, config);

        this.setCommentLineStartSymbol(GetValue(config, 'comment', '//'));
    }

    setCommentLineStartSymbol(symbol) {
        this.commentLineStart = symbol;
        return this;
    }

    start(source) {
        super.start(PreProcessSource(this, source));
        return this;
    }
}

export default Parser;