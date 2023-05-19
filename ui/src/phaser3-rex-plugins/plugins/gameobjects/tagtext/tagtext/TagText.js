import Text from '../textbase/Text.js';
import ParserKlass from './Parser.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class TagText extends Text {
    constructor(scene, x, y, text, style) {
        var tags = GetValue(style, 'tags', undefined);
        var parser = new ParserKlass(tags);
        super(scene, x, y, text, style, 'rexTagText', parser);
    }

    addTag(name, prop) {
        this.parser.addTag(name, prop);
        return this.updateText(true);
    }

    addTags(tags) {
        for (var name in tags) {
            this.parser.addTag(name, tags[name]);
        }
        return this.updateText(true);
    }

    getTag(name) {
        return this.parser.getTag(name);
    }

    preDestroy() {
        super.preDestroy();
        this.parser.destroy();
        this.parser = undefined;
    }
}

export default TagText;