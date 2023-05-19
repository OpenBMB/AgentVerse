import Sizer from '../sizer/Sizer.js';
import OverlapSizer from '../overlapsizer/OverlapSizer.js';
import Buttons from '../buttons/Buttons.js';
import FixWidthButtons from '../fixwidthbuttons/FixWidthButtons.js';
import GridButtons from '../gridbuttons/GridButtons.js';
import Methods from './methods/Methods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Dialog extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }
        // Create sizer        
        config.orientation = 1; // Top to bottom
        super(scene, config);
        this.type = 'rexDialog';
        this.eventEmitter = GetValue(config, 'eventEmitter', this);

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var title = GetValue(config, 'title', undefined);
        var toolbar = GetValue(config, 'toolbar', undefined);
        var toolbarBackground = GetValue(config, 'toolbarBackground', undefined);
        var leftToolbar = GetValue(config, 'leftToolbar', undefined);
        var leftToolbarBackground = GetValue(config, 'leftToolbarBackground', undefined);
        var content = GetValue(config, 'content', undefined);
        var description = GetValue(config, 'description', undefined);
        var choicesSizer;
        var choices = GetValue(config, 'choices', undefined);
        var choicesBackground = GetValue(config, 'choicesBackground', undefined);
        var actionsSizer;
        var actions = GetValue(config, 'actions', undefined);
        var actionsBackground = GetValue(config, 'actionsBackground', undefined);
        var clickConfig = GetValue(config, 'click', undefined);

        if (background) {
            this.addBackground(background);
        }

        var toolbarSizer;
        if (toolbar) {
            toolbarSizer = new Buttons(scene, {
                groupName: 'toolbar',
                background: toolbarBackground,
                buttons: toolbar,
                orientation: 0, // Left-right
                space: { item: GetValue(config, 'space.toolbarItem', 0) },
                click: clickConfig,
                eventEmitter: this.eventEmitter,
            });
        }

        var leftToolbarSizer;
        if (leftToolbar) {
            leftToolbarSizer = new Buttons(scene, {
                groupName: 'leftToolbar',
                background: leftToolbarBackground,
                buttons: leftToolbar,
                orientation: 0, // Left-right
                space: { item: GetValue(config, 'space.leftToolbarItem', 0) },
                click: clickConfig,
                eventEmitter: this.eventEmitter,
            });
        }

        // title or toolbar or leftToolbar
        if (title || toolbar || leftToolbar) {
            var titleExpandWidth = !!title && GetValue(config, 'expand.title', true);
            var titleAlign = GetValue(config, 'align.title', 'center');
            var useOverlapSizer =
                // Has title, title is not exapnd-width, title align to center
                (title && !titleExpandWidth && (titleAlign === 'center')) ||
                // No title
                (!title && (toolbar || leftToolbar));
            var useSizer = !useOverlapSizer;

            var titleSizer;
            if (useSizer) {
                titleSizer = new Sizer(scene, { orientation: 0 });
            } else {
                titleSizer = new OverlapSizer(scene);
            }

            var titleChildExpand = (useSizer) ? true : { height: true };

            // Add leftToolbar
            if (leftToolbarSizer) {
                titleSizer.add(
                    leftToolbarSizer,
                    { align: 'left', expand: titleChildExpand }
                );
            }

            // Add title
            if (title) {
                // Add space if not expand, align to right
                if (useSizer && !titleExpandWidth && (titleAlign === 'right')) {
                    titleSizer.addSpace();
                }

                var padding = {
                    left: GetValue(config, 'space.titleLeft', 0),
                    right: GetValue(config, 'space.titleRight', 0)
                }
                var proportion = (titleExpandWidth) ? 1 : 0;
                titleSizer.add(
                    title,
                    { align: titleAlign, proportion: proportion, expand: titleChildExpand, padding: padding }
                );

                // Add space if not expand, align to left
                if (useSizer && !titleExpandWidth && (titleAlign === 'left')) {
                    titleSizer.addSpace();
                }
            }

            // Add toolbar
            if (toolbarSizer) {
                // Add space if not title
                if (useSizer && !title) {
                    titleSizer.addSpace();
                }
                titleSizer.add(
                    toolbarSizer,
                    { align: 'right', expand: titleChildExpand }
                );
            }

            // Add sizer to dialog
            var titleSpace = GetValue(config, 'space.title', 0);
            var padding;
            if (content || description || choices || actions) {
                padding = { bottom: titleSpace };
            }
            var proportion = GetValue(config, 'proportion.title', 0);
            this.add(
                titleSizer,
                { padding: padding, proportion: proportion, expand: true }
            );
        }

        if (content) {
            var align = GetValue(config, 'align.content', 'center');
            var contentSpace = GetValue(config, 'space.content', 0);
            var padding = {
                left: GetValue(config, 'space.contentLeft', 0),
                right: GetValue(config, 'space.contentRight', 0),
                bottom: ((description || choices || actions) ? contentSpace : 0)
            }
            var proportion = GetValue(config, 'proportion.content', 0);
            var expand = GetValue(config, 'expand.content', true);
            this.add(
                content,
                { align: align, padding: padding, proportion: proportion, expand: expand }
            );
        }

        if (description) {
            var align = GetValue(config, 'align.description', 'center');
            var descriptionSpace = GetValue(config, 'space.description', 0);
            var padding = {
                left: GetValue(config, 'space.descriptionLeft', 0),
                right: GetValue(config, 'space.descriptionRight', 0),
                bottom: ((choices || actions) ? descriptionSpace : 0)
            }
            var proportion = GetValue(config, 'proportion.description', 0);
            var expand = GetValue(config, 'expand.description', true);
            this.add(
                description,
                { align: align, padding: padding, proportion: proportion, expand: expand }
            );
        }

        if (choices) {
            var choicesType = GetValue(config, 'choicesType', '').split('-');
            var ButtonsClass = Contains(choicesType, 'wrap') ? FixWidthButtons :
                Contains(choicesType, 'grid') ? GridButtons :
                    Buttons;
            var buttonsType = Contains(choicesType, 'radio') ? 'radio' :
                Contains(choicesType, 'checkboxes') ? 'checkboxes' : undefined;

            var space = {
                left: GetValue(config, 'space.choicesBackgroundLeft', 0),
                right: GetValue(config, 'space.choicesBackgroundRight', 0),
                top: GetValue(config, 'space.choicesBackgroundTop', 0),
                bottom: GetValue(config, 'space.choicesBackgroundBottom', 0),
            };
            var itemSpace = GetValue(config, 'space.choice', 0);
            if (ButtonsClass === Buttons) {
                space.item = itemSpace;
            } else if (ButtonsClass === FixWidthButtons) {
                space.item = itemSpace;
                space.line = GetValue(config, 'space.choiceLine', itemSpace);
            } else {  // GridButtons
                space.column = GetValue(config, 'space.choiceColumn', itemSpace);
                space.row = GetValue(config, 'space.choiceRow', itemSpace);
            }

            var choicesConfig = {
                width: GetValue(config, 'choicesWidth', undefined),
                height: GetValue(config, 'choicesHeight', undefined),
                groupName: 'choices',
                buttonsType: buttonsType,
                background: choicesBackground,
                buttons: choices,
                space: space,
                click: clickConfig,
                eventEmitter: this.eventEmitter,
                setValueCallback: GetValue(config, 'choicesSetValueCallback', undefined),
                setValueCallbackScope: GetValue(config, 'choicesSetValueCallbackScope', undefined)
            };

            if (ButtonsClass === Buttons) {
                choicesConfig.orientation = Contains(choicesType, 'x') ? 0 : 1;
            }

            choicesSizer = new ButtonsClass(scene, choicesConfig);
            var choicesSpace = GetValue(config, 'space.choices', 0);
            var padding = {
                left: GetValue(config, 'space.choicesLeft', 0),
                right: GetValue(config, 'space.choicesRight', 0),
                bottom: ((actions) ? choicesSpace : 0)
            }
            var align = GetValue(config, 'align.choices', 'center');
            var proportion = GetValue(config, 'proportion.choices', 0);
            var expand = GetValue(config, 'expand.choices', true);
            this.add(
                choicesSizer,
                { align: align, padding: padding, proportion: proportion, expand: expand }
            );

            this.buttonsType = buttonsType;
        }

        if (actions) {
            actionsSizer = new Buttons(scene, {
                groupName: 'actions',
                background: actionsBackground,
                buttons: actions,
                orientation: 0, // Left-right
                space: { item: GetValue(config, 'space.action', 0) },
                expand: GetValue(config, 'expand.actions', false),
                align: GetValue(config, 'align.actions', 'center'),
                click: clickConfig,
                eventEmitter: this.eventEmitter,
            })
            var padding = {
                left: GetValue(config, 'space.actionsLeft', 0),
                right: GetValue(config, 'space.actionsRight', 0)
            }
            var proportion = GetValue(config, 'proportion.action', 0);
            this.add(
                actionsSizer,
                { align: 'center', padding: padding, proportion: proportion, expand: true }
            );
        }

        EmitButtonEvent(this, 'click');
        EmitButtonEvent(this, 'over');
        EmitButtonEvent(this, 'out');
        EmitButtonEvent(this, 'enable');
        EmitButtonEvent(this, 'disable');

        this.addChildrenMap('background', background);
        this.addChildrenMap('title', title);
        this.addChildrenMap('toolbar', toolbar);
        this.addChildrenMap('leftToolbar', leftToolbar);
        this.addChildrenMap('content', content);
        this.addChildrenMap('description', description);
        this.addChildrenMap('choices', (choicesSizer) ? choicesSizer.buttons : undefined);
        this.addChildrenMap('actions', (actionsSizer) ? actionsSizer.buttons : undefined);
        this.addChildrenMap('choicesSizer', choicesSizer);
        this.addChildrenMap('actionsSizer', actionsSizer);
        this.addChildrenMap('toolbarSizer', toolbarSizer);
        this.addChildrenMap('leftToolbarSizer', leftToolbarSizer);
    }
}

var Contains = function (arr, item) {
    return arr.indexOf(item) !== -1;
}

var ButtonsGroupEventNameMap = {
    actions: 'action',
    choices: 'choice',
    toolbar: 'toolbar',
    leftToolbar: 'leftToolbar'
}

var EmitButtonEvent = function (dialog, postEventName) {
    dialog.on(`button.${postEventName}`, function (button, groupName, index, pointer, event) {
        if (!ButtonsGroupEventNameMap.hasOwnProperty(groupName)) {
            return
        }
        dialog.emit(`${ButtonsGroupEventNameMap[groupName]}.${postEventName}`, button, index, pointer, event);
    })
}

Object.assign(
    Dialog.prototype,
    Methods
);

export default Dialog;