this.primevue = this.primevue || {};
this.primevue.blockui = this.primevue.blockui || {};
this.primevue.blockui.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var css = "\n@layer primevue {\n    .p-blockui-container {\n        position: relative;\n    }\n\n    .p-blockui.p-component-overlay {\n        position: absolute;\n    }\n\n    .p-blockui-document.p-component-overlay {\n        position: fixed;\n    }\n}\n";
    var classes = {
      root: 'p-blockui-container'
    };
    var BlockUIStyle = BaseStyle__default["default"].extend({
      name: 'blockui',
      css: css,
      classes: classes
    });

    return BlockUIStyle;

})(primevue.base.style);
