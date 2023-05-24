import {
    Show,
    Hide
} from '../utils/Hide.js';

export default {
    getButtonsSizer(groupName) {
        return this.childrenMap[`${groupName}ButtonsSizer`];
    },

    getButton(groupName, index) {
        var buttonsSizer = this.getButtonsSizer(groupName);
        return (buttonsSizer) ? buttonsSizer.getButton(index) : undefined;
    },

    setButtonEnable(groupName, index, enabled) {
        this.getButtonsSizer(groupName).setButtonEnable(index, enabled);
        return this;
    },

    setLeftButtonEnable(index, enabled) {
        this.childrenMap.leftButtonsSizer.setButtonEnable(index, enabled);
        return this;
    },

    setRightButtonEnable(index, enabled) {
        this.childrenMap.rightButtonsSizer.setButtonEnable(index, enabled);
        return this;
    },

    setTopButtonEnable(index, enabled) {
        this.childrenMap.topButtonsSizer.setButtonEnable(index, enabled);
        return this;
    },

    setBottomButtonEnable(index, enabled) {
        this.childrenMap.bottomButtonsSizer.setButtonEnable(index, enabled);
        return this;
    },

    toggleButtonEnable(groupName, index) {
        this.getButtonsSizer(groupName).toggleButtonEnable(index);
        return this;
    },

    toggleLeftButtonEnable(index) {
        this.childrenMap.leftButtonsSizer.toggleButtonEnable(index);
        return this;
    },

    toggleRightButtonEnable(index) {
        this.childrenMap.rightButtonsSizer.toggleButtonEnable(index);
        return this;
    },

    toggleTopButtonEnable(index) {
        this.childrenMap.topButtonsSizer.toggleButtonEnable(index);
        return this;
    },

    toggleBottomButtonEnable(index) {
        this.childrenMap.bottomButtonsSizer.toggleButtonEnable(index);
        return this;
    },

    getButtonEnable(groupName, index) {
        return this.getButtonsSizer(groupName).getButtonEnable(index);
    },

    getLeftButtonEnable(index) {
        return this.childrenMap.leftButtonsSizer.getButtonEnable(index);
    },

    getRightButtonEnable(index) {
        return this.childrenMap.rightButtonsSizer.getButtonEnable(index);
    },

    getTopButtonEnable(index) {
        return this.childrenMap.topButtonsSizer.getButtonEnable(index);
    },

    getBottomButtonEnable(index) {
        return this.childrenMap.bottomButtonsSizer.getButtonEnable(index);
    },

    emitButtonClick(groupName, index) {
        var buttonsSizer = this.getButtonsSizer(groupName);
        if (!buttonsSizer) {
            return this;
        }
        buttonsSizer.emitButtonClick(index);
        return this;
    },

    emitLeftButtonClick(index) {
        this.childrenMap.leftButtonsSizer.emitButtonClick(index);
        return this;
    },

    emitRightButtonClick(index) {
        this.childrenMap.rightButtonsSizer.emitButtonClick(index);
        return this;
    },

    emitTopButtonClick(index) {
        this.childrenMap.topButtonsSizer.emitButtonClick(index);
        return this;
    },

    emitBottomButtonClick(index) {
        this.childrenMap.bottomButtonsSizer.emitButtonClick(index);
        return this;
    },

    getLeftButton(index) {
        return this.childrenMap.leftButtonsSizer.getButton(index);
    },

    getRightButton(index) {
        return this.childrenMap.rightButtonsSizer.getButton(index);
    },

    getTopButton(index) {
        return this.childrenMap.topButtonsSizer.getButton(index);
    },

    getBottomButton(index) {
        return this.childrenMap.bottomButtonsSizer.getButton(index);
    },

    showButton(groupName, index) {
        Show(this.getButton(groupName, index));
        return this;
    },

    showLeftButton(index) {
        Show(this.getLeftButton(index));
        return this;
    },

    showRightButton(index) {
        Show(this.getRightButton(index));
        return this;
    },

    showTopButton(index) {
        Show(this.getTopButton(index));
        return this;
    },

    showBottomButton(index) {
        Show(this.getBottomButton(index));
        return this;
    },

    hideButton(groupName, index) {
        Hide(this.getButton(groupName, index));
        return this;
    },

    hideLeftButton(index) {
        Hide(this.getLeftButton(index));
        return this;
    },

    hideRightButton(index) {
        Hide(this.getRightButton(index));
        return this;
    },

    hideTopButton(index) {
        Hide(this.getTopButton(index));
        return this;
    },

    hideBottomButton(index) {
        Hide(this.getBottomButton(index));
        return this;
    },

    addButton(groupName, gameObject) {
        this.getButtonsSizer(groupName).addButton(gameObject);
        return this;
    },

    addLeftButton(gameObject) {
        this.addButton('left', gameObject);
        return this;
    },

    addRightButton(gameObject) {
        this.addButton('right', gameObject);
        return this;
    },

    addTopButton(gameObject) {
        this.addButton('top', gameObject);
        return this;
    },

    removeButton(groupName, index, destroyChild) {
        this.getButtonsSizer(groupName).removeButton(index, destroyChild);
        return this;
    },

    removeLeftButton(index, destroyChild) {
        this.removeButton('left', index, destroyChild);
        return this;
    },

    removeRightButton(index, destroyChild) {
        this.removeButton('right', index, destroyChild);
        return this;
    },

    removeTopButton(index, destroyChild) {
        this.removeButton('top', index, destroyChild);
        return this;
    },

    removeBottomButton(index, destroyChild) {
        this.removeButton('bottom', index, destroyChild);
        return this;
    },

    clearButtons(groupName, destroyChild) {
        this.getButtonsSizer(groupName).clearButtons(destroyChild);
        return this;
    },

    clearLeftButtons(destroyChild) {
        this.clearButtons('left', destroyChild);
        return this;
    },

    clearRightButtons(destroyChild) {
        this.clearButtons('right', destroyChild);
        return this;
    },

    clearTopButtons(destroyChild) {
        this.clearButtons('top', destroyChild);
        return this;
    },

    clearBottomButtonss(destroyChild) {
        this.clearButtons('bottom', destroyChild);
        return this;
    },

    forEachButton(groupName, callback, scope) {
        this.getButtonsSizer(groupName).forEachButtton(callback, scope);
        return this;
    },

    forEachLeftButton(callback, scope) {
        this.childrenMap.leftButtonsSizer.forEachButtton(callback, scope);
        return this;
    },

    forEachRightButton(callback, scope) {
        this.childrenMap.rightButtonsSizer.forEachButtton(callback, scope);
        return this;
    },

    forEachTopButton(callback, scope) {
        this.childrenMap.topButtonsSizer.forEachButtton(callback, scope);
        return this;
    },

    forEachBottomButton(callback, scope) {
        this.childrenMap.bottomButtonsSizer.forEachButtton(callback, scope);
        return this;
    },
};