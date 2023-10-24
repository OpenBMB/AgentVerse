'use strict';

var BaseStyle = require('primevue/base/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

var css = "\n@layer primevue {\n    .p-toolbar {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        flex-wrap: wrap;\n    }\n\n    .p-toolbar-group-start,\n    .p-toolbar-group-center,\n    .p-toolbar-group-end {\n        display: flex;\n        align-items: center;\n    }\n\n    .p-toolbar-group-left,\n    .p-toolbar-group-right {\n        display: flex;\n        align-items: center;\n    }\n}\n";
var classes = {
  root: 'p-toolbar p-component',
  start: 'p-toolbar-group-start p-toolbar-group-left',
  center: 'p-toolbar-group-center',
  end: 'p-toolbar-group-end p-toolbar-group-right'
};
var ToolbarStyle = BaseStyle__default["default"].extend({
  name: 'toolbar',
  css: css,
  classes: classes
});

module.exports = ToolbarStyle;
