'use strict';

var BaseStyle = require('primevue/base/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

var css = "\n@layer primevue {\n    .p-steps {\n        position: relative;\n    }\n\n    .p-steps .p-steps-list {\n        padding: 0;\n        margin: 0;\n        list-style-type: none;\n        display: flex;\n    }\n\n    .p-steps-item {\n        position: relative;\n        display: flex;\n        justify-content: center;\n        flex: 1 1 auto;\n        overflow: hidden;\n    }\n\n    .p-steps-item .p-menuitem-link {\n        display: inline-flex;\n        flex-direction: column;\n        align-items: center;\n        overflow: hidden;\n        text-decoration: none;\n    }\n\n    .p-steps.p-steps-readonly .p-steps-item {\n        cursor: auto;\n    }\n\n    .p-steps-item.p-steps-current .p-menuitem-link {\n        cursor: default;\n    }\n\n    .p-steps-title {\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        max-width: 100%;\n    }\n\n    .p-steps-number {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n\n    .p-steps-title {\n        display: block;\n    }\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-steps p-component', {
      'p-readonly': props.readonly
    }];
  },
  menu: 'p-steps-list',
  menuitem: function menuitem(_ref2) {
    var instance = _ref2.instance,
      item = _ref2.item;
    return ['p-steps-item', {
      'p-highlight p-steps-current': instance.isActive(item),
      'p-disabled': instance.isItemDisabled(item)
    }];
  },
  action: function action(_ref3) {
    var props = _ref3.props,
      isActive = _ref3.isActive,
      isExactActive = _ref3.isExactActive;
    return ['p-menuitem-link', {
      'router-link-active': isActive,
      'router-link-active-exact': props.exact && isExactActive
    }];
  },
  step: 'p-steps-number',
  label: 'p-steps-title'
};
var StepsStyle = BaseStyle__default["default"].extend({
  name: 'steps',
  css: css,
  classes: classes
});

module.exports = StepsStyle;
