import AddFolder from './AddFolder.js';
import AddTab from './AddTab.js';
import AddInput from './AddInput.js';
import AddButtons from './AddButtons.js';
import AddSeparator from './AddSeparator.js';
import SetBindingTarget from './SetBindingTarget.js';
import GetMaxInputRowTitleWidth from './GetMaxInputRowTitleWidth.js';
import SetInputRowTitleWidth from './SetInputRowTitleWidth.js';

var methods = {
    addFolder: AddFolder,
    addTab: AddTab,
    addInput: AddInput,
    addButton: AddButtons,
    addButtons: AddButtons,
    addSeparator: AddSeparator,

    setBindingTarget: SetBindingTarget,

    getMaxInputRowTitleWidth: GetMaxInputRowTitleWidth,
    setInputRowTitleWidth: SetInputRowTitleWidth,
}

export default methods;