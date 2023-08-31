import FolderBase from '../../../folder/Folder.js';
import BindingTargetMethods from './BindingTargetMethods.js';
import InputRowTitleWidthMethods from './InputRowTitleWidthMethods.js';

class Folder extends FolderBase {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexTweaker.Folder';
    }

    setTitle(config) {
        var title = this.childrenMap.title;
        title.setTitle(config);
        return this;
    }

}

Object.assign(
    Folder.prototype,
    BindingTargetMethods,
    InputRowTitleWidthMethods,
)

export default Folder;