import CharData from '../bob/char/CharData.js';
import { CharTypeName } from '../bob/Types.js';

var CreateCharChildren = function (text, style) {
    if (style) {
        this.textStyle.modify(style);
    }

    var children = [];
    for (var i = 0, cnt = text.length; i < cnt; i++) {
        var char = text.charAt(i);
        var child = this.poolManager.allocate(CharTypeName);
        if (child === null) {
            child = new CharData(
                this,               // parent
                char,               // text
                this.textStyle,     // style
            );
        } else {
            child
                .setParent(this)
                .setActive()
                .modifyStyle(this.textStyle)
                .setText(char);
        }
        // child.modifyPorperties(properties);  // Warning: Will modify text-style twice

        children.push(child);
    }

    return children;
}

export default CreateCharChildren;