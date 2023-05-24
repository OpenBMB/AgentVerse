import EventSheetTrees from '../eventsheettrees/EventSheetTrees.js';
import Marked2Tree from './methods/Marked2Tree.js';

class MarkedEventSheets extends EventSheetTrees {
    addEventSheet(markedString, {
        lineReturn = '\\',
        commentLineStart = '\/\/',
        parallel = this.parallel,
    } = {}) {

        var tree = Marked2Tree(markedString, {
            lineReturn,
            commentLineStart,
            parallel
        });

        this.addTree(tree);
        return this;
    }
}

export default MarkedEventSheets;