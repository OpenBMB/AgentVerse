this.primevue = this.primevue || {};
this.primevue.splitterpanel = this.primevue.splitterpanel || {};
this.primevue.splitterpanel.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var css = "\n@layer primevue {\n    .p-splitter-panel {\n        flex-grow: 1;\n    }\n\n    .p-splitter-panel-nested {\n        display: flex;\n    }\n\n    .p-splitter-panel .p-splitter {\n        flex-grow: 1;\n        border: 0 none;\n    }\n}\n";
    var classes = {
      root: function root(_ref) {
        var instance = _ref.instance;
        return ['p-splitter-panel', {
          'p-splitter-panel-nested': instance.isNested
        }];
      }
    };
    var SplitterPanelStyle = BaseStyle__default["default"].extend({
      name: 'splitterpanel',
      css: css,
      classes: classes
    });

    return SplitterPanelStyle;

})(primevue.base.style);
