import CharData from '../bob/char/CharData.js';
import { CharTypeName } from '../bob/Types.js';

var CreateCharChild = function (text, style) {
    if (style) {
        this.textStyle.modify(style);
    }

    var child = this.poolManager.allocate(CharTypeName);
    if (child === null) {
        child = new CharData(
            this,               // parent
            text,               // text
            this.textStyle,     // style
        );
    } else {
        child
            .setParent(this)
            .setActive()
            .modifyStyle(this.textStyle)
            .setText(text);
    }

    return child;
}

export default CreateCharChild;