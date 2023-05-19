import CreateListPanel from './CreateListPanel.js';
import DropDown from '../../../dropdown/DropDown.js';

var OpenListPanel = function () {
    if (this.listPanel) {
        return this;
    }

    var listPanel = CreateListPanel.call(this);

    // Button over/out
    listPanel
        .on('button.over', function (button, index, pointer, event) {
            if (this.listOnButtonOver) {
                this.listOnButtonOver.call(this, button, index, pointer, event);
            }

            this.emit('button.over', this, listPanel, button, index, pointer, event);
        }, this)
        .on('button.out', function (button, index, pointer, event) {
            if (this.listOnButtonOut) {
                this.listOnButtonOut.call(this, button, index, pointer, event);
            }

            this.emit('button.out', this, listPanel, button, index, pointer, event);
        }, this);


    var alignTargetX;
    if (!this.listAlignMode || (this.listAlignMode === 'label')) {
        alignTargetX = this;
    } else {
        alignTargetX = this.getElement(this.listAlignMode)
    }

    var dropDownBehavior = new DropDown(listPanel, {
        // Transition
        duration: {
            in: this.listEaseInDuration,
            out: this.listEaseOutDuration
        },
        transitIn: this.listTransitInCallback,
        transitOut: this.listTransitOutCallback,

        // Position
        expandDirection: this.listExpandDirection,

        alignTargetX: alignTargetX,
        alignTargetY: this,
        alignSide: this.listAlignSide,

        bounds: this.listBounds,

        // Close condition
        anyTouchClose: true,
    })
        .on('open', function () {
            // After popping up
            // Can click
            listPanel.on('button.click', function (button, index, pointer, event) {
                if (this.listOnButtonClick) {
                    this.listOnButtonClick.call(this, button, index, pointer, event);
                }
                this.emit('button.click', this, listPanel, button, index, pointer, event);
            }, this);

            this.emit('list.open', this, listPanel);
        }, this)

        .on('close', function () {
            this.listPanel = undefined;
            this.dropDownBehavior = undefined;
        }, this)

    this.listPanel = listPanel;
    this.dropDownBehavior = dropDownBehavior;

    this.pin(listPanel);

    return this;
}

export default OpenListPanel;