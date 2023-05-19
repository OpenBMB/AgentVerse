import Label from '../label/Label.js';
import Methods from './methods/Methods.js'


const GetValue = Phaser.Utils.Objects.GetValue;

class DropDownList extends Label {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexDropDownList';
        this.timer = undefined;

        this.setOptions(GetValue(config, 'options'));

        var listConfig = GetValue(config, 'list');
        this.setWrapEnable(GetValue(listConfig, 'wrap', false));
        this.setCreateButtonCallback(GetValue(listConfig, 'createButtonCallback'));
        this.setCreateListBackgroundCallback(GetValue(listConfig, 'createBackgroundCallback'));
        this.setButtonClickCallback(GetValue(listConfig, 'onButtonClick'));
        this.setButtonOverCallback(GetValue(listConfig, 'onButtonOver'));
        this.setButtonOutCallback(GetValue(listConfig, 'onButtonOut'));
        this.setListExpandDirection(GetValue(listConfig, 'expandDirection'));
        this.setListEaseInDuration(GetValue(listConfig, 'easeIn', 500));
        this.setListEaseOutDuration(GetValue(listConfig, 'easeOut', 100));
        this.setListTransitInCallback(GetValue(listConfig, 'transitIn'));
        this.settListTransitOutCallback(GetValue(listConfig, 'transitOut'));
        this.setListSize(GetValue(listConfig, 'width'), GetValue(listConfig, 'height'));
        this.setListAlignmentMode(GetValue(listConfig, 'alignParent', 'text'));
        this.setListAlignmentSide(GetValue(listConfig, 'alignSide', ''));
        this.setListBounds(GetValue(listConfig, 'bounds'));
        this.setListSpace(GetValue(listConfig, 'space'));
        this.setListDraggable(GetValue(listConfig, 'draggable', false));

        this.setValueChangeCallback(
            GetValue(config, 'setValueCallback'),
            GetValue(config, 'setValueCallbackScope')
        );
        this.setValue(GetValue(config, 'value'));

        this.onClick(this.toggleListPanel, this);
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        if (this.listPanel) {
            this.listPanel.destroy(fromScene);
            this.listPanel = undefined;
        }

        super.destroy(fromScene);
    }

    setOptions(options) {
        if (options === undefined) {
            options = [];
        }
        this.options = options;
        return this;
    }

    setValueChangeCallback(callback, scope) {
        this.valueChangeCallback = callback;
        this.valueChangeCallbackScope = scope;
        return this;
    }

    setValue(value) {
        this.value = value;
        return this;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        if (this._value === value) {
            return;
        }

        var previousValue = this._value;
        this._value = value;

        var callback = this.valueChangeCallback,
            scope = this.valueChangeCallbackScope;
        if (callback) {
            if (scope) {
                callback.call(scope, this, value, previousValue);
            } else {
                callback(this, value, previousValue)
            }
        }

        this.emit('valuechange', this, value, previousValue);

    }

    emitButtonClick(index) {
        var option = this.options[index];
        if (!option) {
            return this;
        }

        this.emit('button.click', this, undefined, option, index);
        return this;
    }

}

Object.assign(
    DropDownList.prototype,
    Methods,
);

export default DropDownList;