import BaseStyle from 'primevue/base/style';

var css = "\n@layer primevue {\n    .p-toolbar {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        flex-wrap: wrap;\n    }\n\n    .p-toolbar-group-start,\n    .p-toolbar-group-center,\n    .p-toolbar-group-end {\n        display: flex;\n        align-items: center;\n    }\n\n    .p-toolbar-group-left,\n    .p-toolbar-group-right {\n        display: flex;\n        align-items: center;\n    }\n}\n";
var classes = {
  root: 'p-toolbar p-component',
  start: 'p-toolbar-group-start p-toolbar-group-left',
  center: 'p-toolbar-group-center',
  end: 'p-toolbar-group-end p-toolbar-group-right'
};
var ToolbarStyle = BaseStyle.extend({
  name: 'toolbar',
  css: css,
  classes: classes
});

export { ToolbarStyle as default };
