this.primevue = this.primevue || {};
this.primevue.radiobutton = this.primevue.radiobutton || {};
this.primevue.radiobutton.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: function root(_ref) {
        var instance = _ref.instance,
          props = _ref.props;
        return ['p-radiobutton p-component', {
          'p-radiobutton-checked': instance.checked,
          'p-radiobutton-disabled': props.disabled,
          'p-radiobutton-focused': instance.focused
        }];
      },
      input: function input(_ref2) {
        var instance = _ref2.instance,
          props = _ref2.props;
        return ['p-radiobutton-box', {
          'p-highlight': instance.checked,
          'p-disabled': props.disabled,
          'p-focus': instance.focused
        }];
      },
      icon: 'p-radiobutton-icon'
    };
    var RadioButtonStyle = BaseStyle__default["default"].extend({
      name: 'radiobutton',
      classes: classes
    });

    return RadioButtonStyle;

})(primevue.base.style);
