import BaseStyle from 'primevue/base/style';

var css = "\n@layer primevue {\n    .p-splitter-panel {\n        flex-grow: 1;\n    }\n\n    .p-splitter-panel-nested {\n        display: flex;\n    }\n\n    .p-splitter-panel .p-splitter {\n        flex-grow: 1;\n        border: 0 none;\n    }\n}\n";
var classes = {
  root: function root(_ref) {
    var instance = _ref.instance;
    return ['p-splitter-panel', {
      'p-splitter-panel-nested': instance.isNested
    }];
  }
};
var SplitterPanelStyle = BaseStyle.extend({
  name: 'splitterpanel',
  css: css,
  classes: classes
});

export { SplitterPanelStyle as default };
