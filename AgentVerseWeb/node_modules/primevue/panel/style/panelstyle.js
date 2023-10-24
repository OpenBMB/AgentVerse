this.primevue = this.primevue || {};
this.primevue.panel = this.primevue.panel || {};
this.primevue.panel.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var css = "\n@layer primevue {\n    .p-panel-header {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n    }\n\n    .p-panel-title {\n        line-height: 1;\n    }\n\n    .p-panel-header-icon {\n        display: inline-flex;\n        justify-content: center;\n        align-items: center;\n        cursor: pointer;\n        text-decoration: none;\n        overflow: hidden;\n        position: relative;\n    }\n}\n";
    var classes = {
      root: function root(_ref) {
        var props = _ref.props;
        return ['p-panel p-component', {
          'p-panel-toggleable': props.toggleable
        }];
      },
      header: 'p-panel-header',
      title: 'p-panel-title',
      icons: 'p-panel-icons',
      toggler: 'p-panel-header-icon p-panel-toggler p-link',
      toggleablecontent: 'p-toggleable-content',
      content: 'p-panel-content',
      footer: 'p-panel-footer'
    };
    var PanelStyle = BaseStyle__default["default"].extend({
      name: 'panel',
      css: css,
      classes: classes
    });

    return PanelStyle;

})(primevue.base.style);
