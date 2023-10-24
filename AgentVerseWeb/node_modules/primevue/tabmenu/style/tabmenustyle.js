this.primevue = this.primevue || {};
this.primevue.tabmenu = this.primevue.tabmenu || {};
this.primevue.tabmenu.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var css = "\n@layer primevue {\n    .p-tabmenu {\n        overflow-x: auto;\n    }\n\n    .p-tabmenu-nav {\n        display: flex;\n        margin: 0;\n        padding: 0;\n        list-style-type: none;\n        flex-wrap: nowrap;\n    }\n\n    .p-tabmenu-nav a {\n        cursor: pointer;\n        user-select: none;\n        display: flex;\n        align-items: center;\n        position: relative;\n        text-decoration: none;\n        text-decoration: none;\n        overflow: hidden;\n    }\n\n    .p-tabmenu-nav a:focus {\n        z-index: 1;\n    }\n\n    .p-tabmenu-nav .p-menuitem-text {\n        line-height: 1;\n    }\n\n    .p-tabmenu-ink-bar {\n        display: none;\n        z-index: 1;\n    }\n\n    .p-tabmenu::-webkit-scrollbar {\n        display: none;\n    }\n}\n";
    var classes = {
      root: 'p-tabmenu p-component',
      menu: 'p-tabmenu-nav p-reset',
      menuitem: function menuitem(_ref) {
        var instance = _ref.instance,
          props = _ref.props,
          index = _ref.index,
          item = _ref.item,
          isActive = _ref.isActive,
          isExactActive = _ref.isExactActive;
        return ['p-tabmenuitem', {
          'p-highlight': (props.exact ? isExactActive : isActive) || instance.d_activeIndex === index,
          'p-disabled': instance.disabled(item)
        }];
      },
      action: 'p-menuitem-link',
      icon: 'p-menuitem-icon',
      label: 'p-menuitem-text',
      inkbar: 'p-tabmenu-ink-bar'
    };
    var TabMenuStyle = BaseStyle__default["default"].extend({
      name: 'tabmenu',
      css: css,
      classes: classes
    });

    return TabMenuStyle;

})(primevue.base.style);
