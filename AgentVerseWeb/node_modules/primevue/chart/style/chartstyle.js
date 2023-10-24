this.primevue = this.primevue || {};
this.primevue.chart = this.primevue.chart || {};
this.primevue.chart.style = (function (BaseStyle) {
    'use strict';

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

    return ChartStyle;

})(primevue.base.style);
