'use strict';

var BaseStyle = require('primevue/base/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-selectbutton p-buttonset p-component', {
      'p-disabled': props.disabled
    }];
  },
  button: function button(_ref2) {
    var instance = _ref2.instance,
      option = _ref2.option;
    return ['p-button p-component', {
      'p-highlight': instance.isSelected(option),
      'p-disabled': instance.isOptionDisabled(option)
    }];
  },
  label: 'p-button-label'
};
var SelectButtonStyle = BaseStyle__default["default"].extend({
  name: 'selectbutton',
  classes: classes
});

module.exports = SelectButtonStyle;
