import BaseStyle from 'primevue/base/style';

var css = "\n@layer primevue {\n    .p-blockui-container {\n        position: relative;\n    }\n\n    .p-blockui.p-component-overlay {\n        position: absolute;\n    }\n\n    .p-blockui-document.p-component-overlay {\n        position: fixed;\n    }\n}\n";
var classes = {
  root: 'p-blockui-container'
};
var BlockUIStyle = BaseStyle.extend({
  name: 'blockui',
  css: css,
  classes: classes
});

export { BlockUIStyle as default };
