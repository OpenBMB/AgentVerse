'use strict';

var BaseStyle = require('primevue/base/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

var classes = {
  root: function root(_ref) {
    var instance = _ref.instance,
      props = _ref.props;
    return ['p-checkbox p-component', {
      'p-checkbox-checked': instance.checked,
      'p-checkbox-disabled': props.disabled,
      'p-checkbox-focused': instance.focused
    }];
  },
  input: function input(_ref2) {
    var instance = _ref2.instance,
      props = _ref2.props;
    return ['p-checkbox-box', {
      'p-highlight': instance.checked,
      'p-disabled': props.disabled,
      'p-focus': instance.focused
    }];
  },
  icon: 'p-checkbox-icon'
};
var CheckboxStyle = BaseStyle__default["default"].extend({
  name: 'checkbox',
  classes: classes
});

module.exports = CheckboxStyle;
