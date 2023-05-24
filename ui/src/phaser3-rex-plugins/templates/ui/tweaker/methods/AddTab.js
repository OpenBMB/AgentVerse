import CreateTab from '../builders/CreateTab.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var AddTab = function (config) {
    var scene = this.scene;

    // Create tab
    var tabStyle = GetValue(this.styles, 'tab') || {};
    tabStyle.tweaker = this.styles;
    tabStyle.root = this.root;
    var tab = CreateTab(scene, config, tabStyle);
    delete tabStyle.tweaker;
    delete tabStyle.root;

    // Add tab
    this.add(
        tab,
        { expand: true }
    );

    var pagesConfig = GetValue(config, 'pages') || [];
    var pages = [];
    var shownPageIndex = 0;
    for (var i = 0, cnt = pagesConfig.length; i < cnt; i++) {
        var childTweaker = tab.getPage(i);

        var isPageShown = pagesConfig[i].show;
        if (isPageShown) {
            shownPageIndex = i;
        }

        var key = pagesConfig[i].key;
        if (key) {
            this.root.addChildrenMap(key, childTweaker);
        }

        pages.push(childTweaker);
    }

    tab.swapPage(shownPageIndex, 0);

    return pages;
}

export default AddTab;