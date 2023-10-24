import BaseStyle from 'primevue/base/style';

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
var SelectButtonStyle = BaseStyle.extend({
  name: 'selectbutton',
  classes: classes
});

export { SelectButtonStyle as default };
