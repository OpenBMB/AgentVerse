import BaseStyle from 'primevue/base/style';

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
var CheckboxStyle = BaseStyle.extend({
  name: 'checkbox',
  classes: classes
});

export { CheckboxStyle as default };
