import BaseStyle from 'primevue/base/style';

var css = "\n@layer primevue {\n    .p-inputswitch {\n        display: inline-block;\n    }\n\n    .p-inputswitch-slider {\n        position: absolute;\n        cursor: pointer;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        border: 1px solid transparent;\n    }\n\n    .p-inputswitch-slider:before {\n        position: absolute;\n        content: '';\n        top: 50%;\n    }\n}\n";
var inlineStyles = {
  root: {
    position: 'relative'
  }
};
var classes = {
  root: function root(_ref) {
    var instance = _ref.instance,
      props = _ref.props;
    return ['p-inputswitch p-component', {
      'p-inputswitch-checked': instance.checked,
      'p-disabled': props.disabled,
      'p-focus': instance.focused
    }];
  },
  slider: 'p-inputswitch-slider'
};
var InputSwitchStyle = BaseStyle.extend({
  name: 'inputswitch',
  css: css,
  classes: classes,
  inlineStyles: inlineStyles
});

export { InputSwitchStyle as default };
