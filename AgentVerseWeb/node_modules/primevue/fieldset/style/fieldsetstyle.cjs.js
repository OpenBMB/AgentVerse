'use strict';

var BaseStyle = require('primevue/base/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

var css = "\n@layer primevue {\n    .p-fieldset-legend > a,\n    .p-fieldset-legend > span {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n\n    .p-fieldset-toggleable .p-fieldset-legend a {\n        cursor: pointer;\n        user-select: none;\n        overflow: hidden;\n        position: relative;\n        text-decoration: none;\n    }\n\n    .p-fieldset-legend-text {\n        line-height: 1;\n    }\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-fieldset p-component', {
      'p-fieldset-toggleable': props.toggleable
    }];
  },
  legend: 'p-fieldset-legend',
  legendtitle: 'p-fieldset-legend-text',
  togglericon: 'p-fieldset-toggler',
  toggleablecontent: 'p-toggleable-content',
  content: 'p-fieldset-content'
};
var FieldsetStyle = BaseStyle__default["default"].extend({
  name: 'fieldset',
  css: css,
  classes: classes
});

module.exports = FieldsetStyle;
