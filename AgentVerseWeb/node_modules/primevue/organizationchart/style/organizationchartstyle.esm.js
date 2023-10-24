import BaseStyle from 'primevue/base/style';

var css = "\n@layer primevue {\n    .p-organizationchart-table {\n        border-spacing: 0;\n        border-collapse: separate;\n        margin: 0 auto;\n    }\n\n    .p-organizationchart-table > tbody > tr > td {\n        text-align: center;\n        vertical-align: top;\n        padding: 0 0.75rem;\n    }\n\n    .p-organizationchart-node-content {\n        display: inline-block;\n        position: relative;\n    }\n\n    .p-organizationchart-node-content .p-node-toggler {\n        position: absolute;\n        bottom: -0.75rem;\n        margin-left: -0.75rem;\n        z-index: 2;\n        left: 50%;\n        user-select: none;\n        cursor: pointer;\n        width: 1.5rem;\n        height: 1.5rem;\n        text-decoration: none;\n    }\n\n    .p-organizationchart-node-content .p-node-toggler .p-node-toggler-icon {\n        position: relative;\n        top: 0.25rem;\n    }\n\n    .p-organizationchart-line-down {\n        margin: 0 auto;\n        height: 20px;\n        width: 1px;\n    }\n\n    .p-organizationchart-line-right {\n        border-radius: 0px;\n    }\n\n    .p-organizationchart-line-left {\n        border-radius: 0;\n    }\n\n    .p-organizationchart-selectable-node {\n        cursor: pointer;\n    }\n}\n";
var classes = {
  root: 'p-organizationchart p-component',
  table: 'p-organizationchart-table',
  node: function node(_ref) {
    var instance = _ref.instance;
    return ['p-organizationchart-node-content', {
      'p-organizationchart-selectable-node': instance.selectable,
      'p-highlight': instance.selected
    }];
  },
  nodeToggler: 'p-node-toggler',
  nodeTogglerIcon: 'p-node-toggler-icon',
  lines: 'p-organizationchart-lines',
  lineDown: 'p-organizationchart-line-down',
  lineLeft: function lineLeft(_ref2) {
    var index = _ref2.index;
    return ['p-organizationchart-line-left', {
      'p-organizationchart-line-top': !(index === 0)
    }];
  },
  lineRight: function lineRight(_ref3) {
    var props = _ref3.props,
      index = _ref3.index;
    return ['p-organizationchart-line-right', {
      'p-organizationchart-line-top': !(index === props.node.children.length - 1)
    }];
  },
  nodes: 'p-organizationchart-nodes'
};
var OrganizationChartStyle = BaseStyle.extend({
  name: 'organizationchart',
  css: css,
  classes: classes
});

export { OrganizationChartStyle as default };
