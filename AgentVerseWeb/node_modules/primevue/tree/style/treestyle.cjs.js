'use strict';

var BaseStyle = require('primevue/base/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

var css = "\n@layer primevue {\n    .p-tree-container {\n        margin: 0;\n        padding: 0;\n        list-style-type: none;\n        overflow: auto;\n    }\n\n    .p-treenode-children {\n        margin: 0;\n        padding: 0;\n        list-style-type: none;\n    }\n\n    .p-tree-wrapper {\n        overflow: auto;\n    }\n\n    .p-treenode-selectable {\n        cursor: pointer;\n        user-select: none;\n    }\n\n    .p-tree-toggler {\n        cursor: pointer;\n        user-select: none;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        overflow: hidden;\n        position: relative;\n        flex-shrink: 0;\n    }\n\n    .p-treenode-leaf > .p-treenode-content .p-tree-toggler {\n        visibility: hidden;\n    }\n\n    .p-treenode-content {\n        display: flex;\n        align-items: center;\n    }\n\n    .p-tree-filter {\n        width: 100%;\n    }\n\n    .p-tree-filter-container {\n        position: relative;\n        display: block;\n        width: 100%;\n    }\n\n    .p-tree-filter-icon {\n        position: absolute;\n        top: 50%;\n        margin-top: -0.5rem;\n    }\n\n    .p-tree-loading {\n        position: relative;\n        min-height: 4rem;\n    }\n\n    .p-tree .p-tree-loading-overlay {\n        position: absolute;\n        z-index: 1;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n\n    .p-tree-flex-scrollable {\n        display: flex;\n        flex: 1;\n        height: 100%;\n        flex-direction: column;\n    }\n\n    .p-tree-flex-scrollable .p-tree-wrapper {\n        flex: 1;\n    }\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-tree p-component', {
      'p-tree-selectable': props.selectionMode != null,
      'p-tree-loading': props.loading,
      'p-tree-flex-scrollable': props.scrollHeight === 'flex'
    }];
  },
  loadingOverlay: 'p-tree-loading-overlay p-component-overlay',
  loadingIcon: 'p-tree-loading-icon',
  filterContainer: 'p-tree-filter-container',
  input: 'p-tree-filter p-inputtext p-component',
  searchIcon: 'p-tree-filter-icon',
  wrapper: 'p-tree-wrapper',
  container: 'p-tree-container',
  node: function node(_ref2) {
    var instance = _ref2.instance;
    return ['p-treenode', {
      'p-treenode-leaf': instance.leaf
    }];
  },
  content: function content(_ref3) {
    var instance = _ref3.instance;
    return ['p-treenode-content', instance.node.styleClass, {
      'p-treenode-selectable': instance.selectable,
      'p-highlight': instance.checkboxMode ? instance.checked : instance.selected
    }];
  },
  toggler: 'p-tree-toggler p-link',
  togglerIcon: 'p-tree-toggler-icon',
  checkboxContainer: 'p-checkbox p-component',
  checkbox: function checkbox(_ref4) {
    var instance = _ref4.instance;
    return ['p-checkbox-box', {
      'p-highlight': instance.checked,
      'p-indeterminate': instance.partialChecked
    }];
  },
  checkboxIcon: 'p-checkbox-icon',
  nodeIcon: function nodeIcon(_ref5) {
    var instance = _ref5.instance;
    return ['p-treenode-icon', instance.node.icon];
  },
  label: 'p-treenode-label',
  subgroup: 'p-treenode-children'
};
var TreeStyle = BaseStyle__default["default"].extend({
  name: 'tree',
  css: css,
  classes: classes
});

module.exports = TreeStyle;
