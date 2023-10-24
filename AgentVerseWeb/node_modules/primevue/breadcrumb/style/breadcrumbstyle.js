this.primevue = this.primevue || {};
this.primevue.breadcrumb = this.primevue.breadcrumb || {};
this.primevue.breadcrumb.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var css = "\n@layer primevue {\n    .p-breadcrumb {\n        overflow-x: auto;\n    }\n\n    .p-breadcrumb .p-breadcrumb-list {\n        margin: 0;\n        padding: 0;\n        list-style-type: none;\n        display: flex;\n        align-items: center;\n        flex-wrap: nowrap;\n    }\n\n    .p-breadcrumb .p-menuitem-text {\n        line-height: 1;\n    }\n\n    .p-breadcrumb .p-menuitem-link {\n        text-decoration: none;\n        display: flex;\n        align-items: center;\n    }\n\n    .p-breadcrumb .p-menuitem-separator {\n        display: flex;\n        align-items: center;\n    }\n\n    .p-breadcrumb::-webkit-scrollbar {\n        display: none;\n    }\n}\n";
    var classes = {
      root: 'p-breadcrumb p-component',
      menu: 'p-breadcrumb-list',
      home: 'p-breadcrumb-home',
      separator: 'p-menuitem-separator',
      menuitem: function menuitem(_ref) {
        var instance = _ref.instance;
        return ['p-menuitem', {
          'p-disabled': instance.disabled()
        }];
      },
      action: function action(_ref2) {
        var props = _ref2.props,
          isActive = _ref2.isActive,
          isExactActive = _ref2.isExactActive;
        return ['p-menuitem-link', {
          'router-link-active': isActive,
          'router-link-active-exact': props.exact && isExactActive
        }];
      },
      icon: 'p-menuitem-icon',
      label: 'p-menuitem-text'
    };
    var BreadcrumbStyle = BaseStyle__default["default"].extend({
      name: 'breadcrumb',
      css: css,
      classes: classes
    });

    return BreadcrumbStyle;

})(primevue.base.style);
