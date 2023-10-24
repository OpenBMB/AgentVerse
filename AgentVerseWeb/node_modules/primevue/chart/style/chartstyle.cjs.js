'use strict';

var BaseStyle = require('primevue/base/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

var css = "\n@layer primevue {\n    .p-chart {\n        position: relative;\n    }\n}\n";
var classes = {
  root: 'p-chart'
};
var ChartStyle = BaseStyle__default["default"].extend({
  name: 'chart',
  css: css,
  classes: classes
});

module.exports = ChartStyle;
