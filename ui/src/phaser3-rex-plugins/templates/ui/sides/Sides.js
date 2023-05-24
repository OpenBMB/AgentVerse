import OverlapSizer from '../overlapsizer/OverlapSizer.js';
import IsFunction from '../../../plugins/utils/object/IsFunction.js';
import GetDefaultCallbacks from './defaultcallbacks/GetDefaultCallbacks.js';
import ShowChildMethods from './ShowChildMethods.js';
import ChildBehaviorMethods from './childbehaviors/index.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Sides extends OverlapSizer {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSides';
        this.childrenMap = this.sizerChildren;
        this.previousChildKey = undefined;
        this.currentChildKey = undefined;

        // Callbacks
        var showChildCallback = GetValue(config, 'showChildCallback', undefined);
        if (showChildCallback) { // Has showChildCallback, and hideChildCallback
            if (IsFunction(showChildCallback)) { // Custom callbacks
                var showChildCallbackScope = GetValue(config, 'showChildCallbackScope', undefined);
                this.on('showchild', showChildCallback, showChildCallbackScope);

                var hideChildCallback = GetValue(config, 'hideChildCallback', undefined);
                var hideChildCallbackScope = GetValue(config, 'hideChildCallbackScope', undefined);
                this.on('hidechild', hideChildCallback, hideChildCallbackScope);
            } else { // Default callbacks
                var defaultCallbacks = GetDefaultCallbacks(showChildCallback);
                this.on('showchild', defaultCallbacks.show);
                this.on('hidechild', defaultCallbacks.hide);
            }
        }

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var panel = GetValue(config, 'panel', undefined);
        var leftSide = GetValue(config, 'leftSide', undefined);
        var rightSide = GetValue(config, 'rightSide', undefined);
        var topSide = GetValue(config, 'topSide', undefined);
        var bottomSide = GetValue(config, 'bottomSide', undefined);

        if (background) {
            this.addBackground(background);
        }
        if (panel) {
            this.add(panel, 'panel', 'center', 0, true);
        }
        if (leftSide) {
            var expand = GetValue(config, 'expand.left', true);
            this.add(leftSide, 'leftSide', 'left-top', 0, { height: expand });
        }
        if (rightSide) {
            var expand = GetValue(config, 'expand.right', true);
            this.add(rightSide, 'rightSide', 'right-top', 0, { height: expand });
        }
        if (topSide) {
            var expand = GetValue(config, 'expand.top', true);
            this.add(topSide, 'topSide', 'left-top', 0, { width: expand });
        }
        if (bottomSide) {
            var expand = GetValue(config, 'expand.bottom', true);
            this.add(bottomSide, 'bottomSide', 'left-bottom', 0, { width: expand });
        }
    }

    reset() {
        this.previousChildKey = undefined;
        this.currentChildKey = 'panel';
        this.showChild('panel', true);
        this.hideChild('leftSide', true);
        this.hideChild('rightSide', true);
        this.hideChild('topSide', true);
        this.hideChild('bottomSide', true);
        return this;
    }
}

Object.assign(
    Sides.prototype,
    ShowChildMethods,
    ChildBehaviorMethods
);

export default Sides;