import BaseStyle from 'primevue/base/style';

var css = "\n@layer primevue {\n    .p-chart {\n        position: relative;\n    }\n}\n";
var classes = {
  root: 'p-chart'
};
var ChartStyle = BaseStyle.extend({
  name: 'chart',
  css: css,
  classes: classes
});

export { ChartStyle as default };
