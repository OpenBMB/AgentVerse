import Scrollable from '../utils/scrollable/Scrollable.js';
import GetScrollMode from '../utils/GetScrollMode.js';
import ScrollableBlock from './scrollableblock/ScrollableBlock.js';
import SetChildrenInteractive from '../utils/setchildreninteractive/SetChildrenInteractive.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ScrollablePanel extends Scrollable {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        // Create scrollable-block
        var scrollMode = GetScrollMode(config);
        var panelConfig = GetValue(config, 'panel', undefined);
        if (panelConfig === undefined) {
            panelConfig = {};
        }
        panelConfig.scrollMode = scrollMode;
        panelConfig.clamplChildOY = GetValue(config, 'clamplChildOY', false);
        var scrollableBlock = new ScrollableBlock(scene, panelConfig);
        scene.add.existing(scrollableBlock); // Important: Add to display list for touch detecting
        var panelWidth = GetValue(panelConfig, 'width', undefined);
        var panelHeight = GetValue(panelConfig, 'height', undefined);
        var proportion, expand;
        if (scrollMode === 0) {
            proportion = (panelWidth === undefined) ? 1 : 0;
            expand = (panelHeight === undefined);
        } else {
            proportion = (panelHeight === undefined) ? 1 : 0;
            expand = (panelWidth === undefined);
        }

        // Fill config of scrollable
        config.type = 'rexScrollablePanel';
        config.child = {
            gameObject: scrollableBlock,
            proportion: proportion,
            expand: expand,
        };
        var spaceConfig = GetValue(config, 'space', undefined);
        if (spaceConfig) {
            spaceConfig.child = spaceConfig.panel;
        }
        super(scene, config);

        this.addChildrenMap('panel', scrollableBlock.child);
        this.addChildrenMap('panelLayer', scrollableBlock.maskLayer);
        this.addChildrenMap('mask', scrollableBlock.maskGameObject);
    }

    setChildrenInteractive(config) {
        if (config === undefined) {
            config = {};
        }

        if (!config.hasOwnProperty('eventEmitter')) {
            config.eventEmitter = this;
        }

        if (!config.hasOwnProperty('targets')) {
            config.targets = [this.childrenMap.panel];
        }

        SetChildrenInteractive(this.childrenMap.child, config);
        return this;
    }
}

export default ScrollablePanel;