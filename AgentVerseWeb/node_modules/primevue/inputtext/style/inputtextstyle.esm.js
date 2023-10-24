import BaseStyle from 'primevue/base/style';

var classes = {
  root: function root(_ref) {
    var instance = _ref.instance,
      props = _ref.props;
    return ['p-inputtext p-component', {
      'p-filled': instance.filled,
      'p-inputtext-sm': props.size === 'small',
      'p-inputtext-lg': props.size === 'large'
    }];
  }
};
var InputTextStyle = BaseStyle.extend({
  name: 'inputtext',
  classes: classes
});

export { InputTextStyle as default };
