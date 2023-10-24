'use strict';

var BaseStyle = require('primevue/base/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

var css = "\n@layer primevue {\n    .p-listbox-list-wrapper {\n        overflow: auto;\n    }\n\n    .p-listbox-list {\n        list-style-type: none;\n        margin: 0;\n        padding: 0;\n    }\n\n    .p-listbox-item {\n        cursor: pointer;\n        position: relative;\n        overflow: hidden;\n    }\n\n    .p-listbox-item-group {\n        cursor: auto;\n    }\n\n    .p-listbox-filter-container {\n        position: relative;\n    }\n\n    .p-listbox-filter-icon {\n        position: absolute;\n        top: 50%;\n        margin-top: -0.5rem;\n    }\n\n    .p-listbox-filter {\n        width: 100%;\n    }\n}\n";
var classes = {
  root: function root(_ref) {
    var instance = _ref.instance,
      props = _ref.props;
    return ['p-listbox p-component', {
      'p-focus': instance.focused,
      'p-disabled': props.disabled
    }];
  },
  header: 'p-listbox-header',
  filterContainer: 'p-listbox-filter-container',
  filterInput: 'p-listbox-filter p-inputtext p-component',
  filterIcon: 'p-listbox-filter-icon',
  wrapper: 'p-listbox-list-wrapper',
  list: 'p-listbox-list',
  itemGroup: 'p-listbox-item-group',
  item: function item(_ref2) {
    var instance = _ref2.instance,
      option = _ref2.option,
      index = _ref2.index,
      getItemOptions = _ref2.getItemOptions;
    return ['p-listbox-item', {
      'p-highlight': instance.isSelected(option),
      'p-focus': instance.focusedOptionIndex === instance.getOptionIndex(index, getItemOptions),
      'p-disabled': instance.isOptionDisabled(option)
    }];
  },
  emptyMessage: 'p-listbox-empty-message'
};
var ListboxStyle = BaseStyle__default["default"].extend({
  name: 'listbox',
  css: css,
  classes: classes
});

module.exports = ListboxStyle;
