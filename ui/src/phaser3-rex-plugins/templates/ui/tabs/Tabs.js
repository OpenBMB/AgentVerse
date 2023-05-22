import GridSizer from '../gridsizer/GridSizer.js';
import Buttons from '../buttons/Buttons.js';
import ButtonMethods from './ButtonMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Tabs extends GridSizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }
        // Create sizer
        config.column = 3;
        config.row = 3;
        super(scene, config);
        this.type = 'rexTabs';
        this.eventEmitter = GetValue(config, 'eventEmitter', this);

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var panel = GetValue(config, 'panel', undefined);
        var leftButtons = GetValue(config, 'leftButtons', undefined);
        var leftButtonsBackground = GetValue(config, 'leftButtonsBackground', undefined);
        var leftButtonsSizer;
        var rightButtons = GetValue(config, 'rightButtons', undefined);
        var rightButtonsBackground = GetValue(config, 'rightButtonsBackground', undefined);
        var rightButtonsSizer;
        var topButtons = GetValue(config, 'topButtons', undefined);
        var topButtonsBackground = GetValue(config, 'topButtonsBackground', undefined);
        var topButtonsSizer;
        var bottomButtons = GetValue(config, 'bottomButtons', undefined);
        var bottomButtonsBackground = GetValue(config, 'bottomButtonsBackground', undefined);
        var bottomButtonsSizer;
        var clickConfig = GetValue(config, 'click', undefined);

        if (background) {
            this.addBackground(background);
        }

        if (panel) {
            this.add(panel, 1, 1, 'center', 0, true);
        }

        if (leftButtons) {
            var leftButtonsOffset = GetValue(config, 'space.leftButtonsOffset', 0);
            var leftButtonSpace = GetValue(config, 'space.leftButton', 0);
            leftButtonsSizer = new Buttons(scene, {
                groupName: 'left',
                background: leftButtonsBackground,
                buttons: leftButtons,
                orientation: 1, // Top-Bottom
                space: { item: leftButtonSpace },
                align: GetValue(config, 'align.leftButtons', undefined),
                click: clickConfig,
                eventEmitter: this.eventEmitter,
            });
            var padding = {
                top: leftButtonsOffset,
            };
            this.add(leftButtonsSizer, 0, 1, 'top', padding, false);
        }

        if (rightButtons) {
            var rightButtonsOffset = GetValue(config, 'space.rightButtonsOffset', 0);
            var rightButtonSpace = GetValue(config, 'space.rightButton', 0);
            rightButtonsSizer = new Buttons(scene, {
                groupName: 'right',
                background: rightButtonsBackground,
                buttons: rightButtons,
                orientation: 1, // Top-Bottom
                space: { item: rightButtonSpace },
                align: GetValue(config, 'align.rightButtons', undefined),
                click: clickConfig,
                eventEmitter: this.eventEmitter,
            });
            var padding = {
                top: rightButtonsOffset,
            };
            this.add(rightButtonsSizer, 2, 1, 'top', padding, false);
        }

        if (topButtons) {
            var toptButtonsOffset = GetValue(config, 'space.topButtonsOffset', 0);
            var topButtonSpace = GetValue(config, 'space.topButton', 0);
            topButtonsSizer = new Buttons(scene, {
                groupName: 'top',
                background: topButtonsBackground,
                buttons: topButtons,
                orientation: 0, // Left-Right
                space: { item: topButtonSpace },
                align: GetValue(config, 'align.topButtons', undefined),
                click: clickConfig,
                eventEmitter: this.eventEmitter,
            });
            var padding = {
                left: toptButtonsOffset,
            };
            this.add(topButtonsSizer, 1, 0, 'left', padding, false);
        }

        if (bottomButtons) {
            var bottomButtonsOffset = GetValue(config, 'space.bottomButtonsOffset', 0);
            var bottomButtonSpace = GetValue(config, 'space.bottomButton', 0);
            bottomButtonsSizer = new Buttons(scene, {
                groupName: 'bottom',
                background: bottomButtonsBackground,
                buttons: bottomButtons,
                orientation: 0, // Left-Right
                space: { item: bottomButtonSpace },
                align: GetValue(config, 'align.bottomButtons', undefined),
                click: clickConfig,
                eventEmitter: this.eventEmitter,
            });
            var padding = {
                left: bottomButtonsOffset,
            };
            this.add(bottomButtonsSizer, 1, 2, 'left', padding, false);
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('panel', panel);
        this.addChildrenMap('leftButtons', leftButtons);
        this.addChildrenMap('rightButtons', rightButtons);
        this.addChildrenMap('topButtons', topButtons);
        this.addChildrenMap('bottomButtons', bottomButtons);
        this.addChildrenMap('leftButtonsSizer', leftButtonsSizer);
        this.addChildrenMap('rightButtonsSizer', rightButtonsSizer);
        this.addChildrenMap('topButtonsSizer', topButtonsSizer);
        this.addChildrenMap('bottomButtonsSizer', bottomButtonsSizer);
    }
}

Object.assign(
    Tabs.prototype,
    ButtonMethods
);

export default Tabs;