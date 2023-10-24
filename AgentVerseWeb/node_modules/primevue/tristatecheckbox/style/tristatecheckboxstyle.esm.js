import BaseStyle from 'primevue/base/style';

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
var TriStateCheckboxStyle = BaseStyle.extend({
  name: 'tristatecheckbox',
  classes: classes
});

export { TriStateCheckboxStyle as default };
