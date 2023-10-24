this.primevue = this.primevue || {};
this.primevue.tristatecheckbox = this.primevue.tristatecheckbox || {};
this.primevue.tristatecheckbox.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: function root(_ref) {
        var instance = _ref.instance,
          props = _ref.props;
        return ['p-checkbox p-component', {
          'p-checkbox-checked': props.modelValue === true,
          'p-checkbox-disabled': props.disabled,
          'p-checkbox-focused': instance.focused
        }];
      },
      checkbox: function checkbox(_ref2) {
        var instance = _ref2.instance,
          props = _ref2.props;
        return ['p-checkbox-box', {
          'p-highlight': props.modelValue != null,
          'p-disabled': props.disabled,
          'p-focus': instance.focused
        }];
      },
      checkIcon: 'p-checkbox-icon',
      uncheckIcon: 'p-checkbox-icon',
      nullableIcon: 'p-checkbox-icon'
    };
    var TriStateCheckboxStyle = BaseStyle__default["default"].extend({
      name: 'tristatecheckbox',
      classes: classes
    });

    return TriStateCheckboxStyle;

})(primevue.base.style);
