import BaseStyle from 'primevue/base/style';

var css = "\n@layer primevue {\n    .p-slider {\n        position: relative;\n    }\n\n    .p-slider .p-slider-handle {\n        cursor: grab;\n        touch-action: none;\n        display: block;\n    }\n\n    .p-slider-range {\n        display: block;\n    }\n\n    .p-slider-horizontal .p-slider-range {\n        top: 0;\n        left: 0;\n        height: 100%;\n    }\n\n    .p-slider-horizontal .p-slider-handle {\n        top: 50%;\n    }\n\n    .p-slider-vertical {\n        height: 100px;\n    }\n\n    .p-slider-vertical .p-slider-handle {\n        left: 50%;\n    }\n\n    .p-slider-vertical .p-slider-range {\n        bottom: 0;\n        left: 0;\n        width: 100%;\n    }\n}\n";
var inlineStyles = {
  handle: {
    position: 'absolute'
  },
  range: {
    position: 'absolute'
  }
};
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-slider p-component', {
      'p-disabled': props.disabled,
      'p-slider-horizontal': props.orientation === 'horizontal',
      'p-slider-vertical': props.orientation === 'vertical'
    }];
  },
  range: 'p-slider-range',
  handle: 'p-slider-handle'
};
var SliderStyle = BaseStyle.extend({
  name: 'slider',
  css: css,
  classes: classes,
  inlineStyles: inlineStyles
});

export { SliderStyle as default };
