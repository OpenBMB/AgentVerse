this.primevue = this.primevue || {};
this.primevue.tabview = this.primevue.tabview || {};
this.primevue.tabview.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var css = "\n@layer primevue {\n    .p-tabview-nav-container {\n        position: relative;\n    }\n\n    .p-tabview-scrollable .p-tabview-nav-container {\n        overflow: hidden;\n    }\n\n    .p-tabview-nav-content {\n        overflow-x: auto;\n        overflow-y: hidden;\n        scroll-behavior: smooth;\n        scrollbar-width: none;\n        overscroll-behavior: contain auto;\n    }\n\n    .p-tabview-nav {\n        display: flex;\n        margin: 0;\n        padding: 0;\n        list-style-type: none;\n        flex: 1 1 auto;\n    }\n\n    .p-tabview-header-action {\n        cursor: pointer;\n        user-select: none;\n        display: flex;\n        align-items: center;\n        position: relative;\n        text-decoration: none;\n        overflow: hidden;\n    }\n\n    .p-tabview-ink-bar {\n        display: none;\n        z-index: 1;\n    }\n\n    .p-tabview-header-action:focus {\n        z-index: 1;\n    }\n\n    .p-tabview-title {\n        line-height: 1;\n        white-space: nowrap;\n    }\n\n    .p-tabview-nav-btn {\n        position: absolute;\n        top: 0;\n        z-index: 2;\n        height: 100%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n\n    .p-tabview-nav-prev {\n        left: 0;\n    }\n\n    .p-tabview-nav-next {\n        right: 0;\n    }\n\n    .p-tabview-nav-content::-webkit-scrollbar {\n        display: none;\n    }\n}\n";
    var classes = {
      root: function root(_ref) {
        var props = _ref.props;
        return ['p-tabview p-component', {
          'p-tabview-scrollable': props.scrollable
        }];
      },
      navContainer: 'p-tabview-nav-container',
      previousButton: 'p-tabview-nav-prev p-tabview-nav-btn p-link',
      navContent: 'p-tabview-nav-content',
      nav: 'p-tabview-nav',
      tab: {
        header: function header(_ref2) {
          var instance = _ref2.instance,
            tab = _ref2.tab,
            index = _ref2.index;
          return ['p-tabview-header', instance.getTabProp(tab, 'headerClass'), {
            'p-highlight': instance.d_activeIndex === index,
            'p-disabled': instance.getTabProp(tab, 'disabled')
          }];
        },
        headerAction: 'p-tabview-nav-link p-tabview-header-action',
        headerTitle: 'p-tabview-title',
        content: function content(_ref3) {
          var instance = _ref3.instance,
            tab = _ref3.tab;
          return ['p-tabview-panel', instance.getTabProp(tab, 'contentClass')];
        }
      },
      inkbar: 'p-tabview-ink-bar',
      nextButton: 'p-tabview-nav-next p-tabview-nav-btn p-link',
      panelContainer: 'p-tabview-panels'
    };
    var TabViewStyle = BaseStyle__default["default"].extend({
      name: 'tabview',
      css: css,
      classes: classes
    });

    return TabViewStyle;

})(primevue.base.style);
