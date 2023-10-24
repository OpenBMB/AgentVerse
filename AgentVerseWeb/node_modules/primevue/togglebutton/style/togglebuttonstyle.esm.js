import BaseStyle from 'primevue/base/style';

var classes = {
  root: function root(_ref) {
    var instance = _ref.instance,
      props = _ref.props;
    return ['p-button p-togglebutton p-component', {
      'p-focus': instance.focused,
      'p-button-icon-only': instance.hasIcon && !instance.hasLabel,
      'p-disabled': props.disabled,
      'p-highlight': props.modelValue === true
    }];
  },
  icon: function icon(_ref2) {
    var instance = _ref2.instance,
      props = _ref2.props;
    return ['p-button-icon', {
      'p-button-icon-left': props.iconPos === 'left' && instance.label,
      'p-button-icon-right': props.iconPos === 'right' && instance.label
    }];
  },
  label: 'p-button-label'
};
var ToggleButtonStyle = BaseStyle.extend({
  name: 'accordion',
  classes: classes
});

export { ToggleButtonStyle as default };
