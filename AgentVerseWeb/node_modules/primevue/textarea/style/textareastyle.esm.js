import BaseStyle from 'primevue/base/style';

var css = "\n@layer primevue {\n    .p-inputtextarea-resizable {\n        overflow: hidden;\n        resize: none;\n    }\n\n    .p-fluid .p-inputtextarea {\n        width: 100%;\n    }\n}\n";
var classes = {
  root: function root(_ref) {
    var instance = _ref.instance,
      props = _ref.props;
    return ['p-inputtextarea p-inputtext p-component', {
      'p-filled': instance.filled,
      'p-inputtextarea-resizable ': props.autoResize
    }];
  }
};
var TextareaStyle = BaseStyle.extend({
  name: 'textarea',
  css: css,
  classes: classes
});

export { TextareaStyle as default };
