import Live2dCoreScriptFile from './Live2dCoreScriptFile.js';

var CoreScriptFileCallback = function (url) {
    this.addFile(new Live2dCoreScriptFile(this, url));
    return this;
}

export default CoreScriptFileCallback;