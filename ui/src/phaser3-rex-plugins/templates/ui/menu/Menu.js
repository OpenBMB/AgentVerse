import Buttons from '../buttons/Buttons.js';
import Methods from './methods/Methods.js';
import CreateBackground from './methods/CreateBackground.js';
import CreateButtons from './methods/CreateButtons.js';
import GetViewport from '../../../plugins/utils/system/GetViewport.js';
import MenuSetInteractive from './methods/MenuSetInteractive.js';
import ParseEaseConfig from './methods/ParseEaseConfig.js';
import GetEaseConfig from './methods/GetEaseConfig.js';
import Expand from './methods/Expand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Menu extends Buttons {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        // Orientation
        if (!config.hasOwnProperty('orientation')) {
            config.orientation = 1; // y
        }

        // Parent
        var rootMenu = config._rootMenu;
        var parentMenu = config._parentMenu;
        var parentButton = config._parentButton;
        // Popup, root menu can be static, sub-menus are always popup.
        var popUp = GetValue(config, 'popup', true);
        // Items
        var items = GetValue(config, 'items', undefined);
        // Background
        var createBackgroundCallback = GetValue(config, 'createBackgroundCallback', undefined);
        var createBackgroundCallbackScope = GetValue(config, 'createBackgroundCallbackScope', undefined);
        config.background = CreateBackground(scene, items, createBackgroundCallback, createBackgroundCallbackScope);
        // Buttons
        var createButtonCallback = GetValue(config, 'createButtonCallback', undefined);
        var createButtonCallbackScope = GetValue(config, 'createButtonCallbackScope', undefined);
        config.buttons = CreateButtons(scene, items, createButtonCallback, createButtonCallbackScope);

        super(scene, config);
        this.type = 'rexMenu';

        this.items = items;
        this.root = (rootMenu === undefined) ? this : rootMenu;
        this.isRoot = (this.root === this);
        this.parentMenu = parentMenu;
        this.parentButton = parentButton;
        this.timer = undefined;

        // Root menu
        if (this.isRoot) {
            this.isPopUpMode = popUp;
            // Bounds
            var bounds = config.bounds;
            if (bounds === undefined) {
                bounds = GetViewport(scene);
            }
            this.bounds = bounds;

            // Side of submenu
            this.subMenuSide = [
                ((this.y < bounds.centerY) ? SUBMENU_DOWN : SUBMENU_UP),
                ((this.x < bounds.centerX) ? SUBMENU_RIGHT : SUBMENU_LEFT)
            ];
            // Overwrite subMenuSide value if given
            var subMenuSide = GetValue(config, 'subMenuSide', undefined);
            if (subMenuSide !== undefined) {
                if (typeof (subMenuSide) === 'string') {
                    subMenuSide = SubMenuSideMode[subMenuSide];
                }
                this.subMenuSide[this.orientation] = subMenuSide;
            }
            // ToggleOrientation mode
            this.toggleOrientation = GetValue(config, 'toggleOrientation', false);
            // Expand mode
            this.expandEventName = GetValue(config, 'expandEvent', 'button.click');
            // Transition
            this.easeIn = ParseEaseConfig(this, GetValue(config, 'easeIn', 0));
            this.easeOut = ParseEaseConfig(this, GetValue(config, 'easeOut', 0));
            this.setTransitInCallback(GetValue(config, 'transitIn'));
            this.setTransitOutCallback(GetValue(config, 'transitOut'));
            // Callbacks
            this.createBackgroundCallback = createBackgroundCallback;
            this.createBackgroundCallbackScope = createBackgroundCallbackScope;
            this.createButtonCallback = createButtonCallback;
            this.createButtonCallbackScope = createButtonCallbackScope;
            // Children key
            this.childrenKey = GetValue(config, 'childrenKey', 'children');
            // Event flag
            this._isPassedEvent = false;

            // pointerdown-outside-collapse
            this.pointerDownOutsideCollapsing = GetValue(config, 'pointerDownOutsideCollapsing', true);
            if (this.pointerDownOutsideCollapsing) {
                scene.input.on('pointerdown', this.onPointerDownOutside, this);
            }

        } else {  // Sub-menu

        }

        var originX = 0, originY = 0;
        if (!this.root.easeIn.sameOrientation) {
            var easeOrientation = GetEaseConfig(this.root.easeIn, this).orientation;
            var menuOrientation = (parentMenu) ? parentMenu.orientation : this.orientation;
            var subMenuSide = this.root.subMenuSide[menuOrientation];
            if ((easeOrientation === 0) && (subMenuSide === SUBMENU_LEFT)) {
                originX = 1;
            }
            if ((easeOrientation === 1) && (subMenuSide === SUBMENU_UP)) {
                originY = 1;
            }
        }

        if (popUp) {
            this.setOrigin(originX, originY).layout();
        }

        // Sub-menu: 
        // - scale to root's scale value
        // - align to parent button
        if (!this.isRoot) {
            this.setScale(this.root.scaleX, this.root.scaleY);
            var subMenuSide = this.root.subMenuSide[parentMenu.orientation];
            switch (subMenuSide) {
                case SUBMENU_LEFT: //Put submene at left side
                    this.alignTop(parentButton.top).alignRight(parentButton.left);
                    break;

                case SUBMENU_RIGHT: //Put submene at right side
                    this.alignTop(parentButton.top).alignLeft(parentButton.right);
                    break;

                case SUBMENU_UP: //Put submene at up side
                    this.alignLeft(parentButton.left).alignBottom(parentButton.top);
                    break;

                case SUBMENU_DOWN: //Put submene at down side
                    this.alignLeft(parentButton.left).alignTop(parentButton.bottom);
                    break;
            }
        }

        MenuSetInteractive(this);

        if (popUp) {
            this.pushIntoBounds(this.root.bounds);

            // Expand this menu
            Expand.call(this);
        }

    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        if (this.isRoot && this.pointerDownOutsideCollapsing) {
            this.scene.input.off('pointerdown', this.onPointerDownOutside, this);
        }

        super.destroy(fromScene);
        this.removeDelayCall();
    }

    isInTouching(pointer) {
        if (super.isInTouching(pointer)) {
            return true;
        } else if (this.childrenMap.subMenu) {
            return this.childrenMap.subMenu.isInTouching(pointer);
        } else {
            return false;
        }
    }

    onPointerDownOutside(pointer) {
        if (this.isInTouching(pointer)) {
            return;
        }

        if (this.isPopUpMode) {
            this.collapse();
        } else {
            this.collapseSubMenu();
        }
    }


}

const SUBMENU_LEFT = 2;
const SUBMENU_RIGHT = 0;
const SUBMENU_UP = 3;
const SUBMENU_DOWN = 1;
const SubMenuSideMode = {
    up: SUBMENU_UP,
    down: SUBMENU_DOWN,
    left: SUBMENU_LEFT,
    right: SUBMENU_RIGHT
}

Object.assign(
    Menu.prototype,
    Methods
);
export default Menu;