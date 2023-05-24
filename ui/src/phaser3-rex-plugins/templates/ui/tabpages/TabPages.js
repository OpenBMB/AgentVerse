import Sizer from '../sizer/Sizer.js';
import Buttons from '../buttons/Buttons.js';
import FixWidthButtons from '../fixwidthbuttons/FixWidthButtons.js';
import Pages from '../pages/Pages.js';
import Methods from './methods/Methods.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const SizerAdd = Sizer.prototype.add;

class TabPages extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        var tabsPosition = GetValue(config, 'tabPosition', 'top');
        var sizerOrientation = ((tabsPosition === 'left') || (tabsPosition === 'right')) ? 'x' : 'y';
        config.orientation = sizerOrientation;
        super(scene, config);
        this.type = 'rexTabPages';

        // Add elements
        var background = GetValue(config, 'background', undefined);
        if (background) {
            this.addBackground(background);
        }

        var pagesConfig = GetValue(config, 'pages');
        var pages = new Pages(scene, pagesConfig);
        scene.add.existing(pages);

        var isHorizontalTabs = (sizerOrientation === 'y');
        var wrapTabs = (isHorizontalTabs) ? GetValue(config, 'wrapTabs', false) : false;

        var tabsConfig = GetValue(config, 'tabs', undefined);
        if (tabsConfig === undefined) {
            tabsConfig = {};
        }
        var ButtonsClass = (wrapTabs) ? FixWidthButtons : Buttons;
        tabsConfig.orientation = (isHorizontalTabs) ? 'x' : 'y';
        tabsConfig.buttonsType = 'radio';
        var tabs = new ButtonsClass(scene, tabsConfig);
        scene.add.existing(tabs);

        var tabsExpand = (wrapTabs) ? true : GetValue(config, 'expand.tabs', false);
        var tabAlign = GetValue(config, 'align.tabs', 'left');
        switch (tabsPosition) {
            case 'top':
            case 'left':
                SizerAdd.call(this, tabs, { proportion: 0, expand: tabsExpand, align: tabAlign });
                SizerAdd.call(this, pages, { proportion: 1, expand: true });
                break;

            case 'bottom':
            case 'right':
                SizerAdd.call(this, pages, { proportion: 1, expand: true });
                SizerAdd.call(this, tabs, { proportion: 0, expand: tabsExpand, align: tabAlign });
                break;

        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('tabs', tabs);
        this.addChildrenMap('pages', pages);

        // Register events
        tabs.on('button.click', function (tab) {
            var key = tab.name;
            if (pages.hasPage(key)) {
                pages.swapPage(key);
            }
        });

        tabs.on('button.statechange', function (tab, index, value, previousValue) {
            var eventName = (value) ? 'tab.focus' : 'tab.blur';
            this.emit(eventName, tab, tab.name);
        }, this)

        pages.on('pagevisible', function (pageObject, key, pages) {
            this.emit('page.focus', pageObject, key);
        })

        pages.on('pageinvisible', function (pageObject, key, pages) {
            this.emit('page.blur', pageObject, key);
        })

    }

    get currentKey() {
        return this.getElement('pages').currentKey;
    }

    set currentKey(key) {
        this.showPage(key);
    }

    get keys() {
        return this.getElement('pages').keys;
    }

    get currentPage() {
        return this.getElement('pages').currentPage;
    }

    get previousPage() {
        return this.getElement('pages').previousPage;
    }

}

Object.assign(
    TabPages.prototype,
    Methods
);

export default TabPages;