this.primevue = this.primevue || {};
this.primevue.inputnumber = this.primevue.inputnumber || {};
this.primevue.inputnumber.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var css = "\n@layer primevue {\n    .p-inputnumber {\n        display: inline-flex;\n    }\n\n    .p-inputnumber-button {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex: 0 0 auto;\n    }\n\n    .p-inputnumber-buttons-stacked .p-button.p-inputnumber-button .p-button-label,\n    .p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button .p-button-label {\n        display: none;\n    }\n\n    .p-inputnumber-buttons-stacked .p-button.p-inputnumber-button-up {\n        border-top-left-radius: 0;\n        border-bottom-left-radius: 0;\n        border-bottom-right-radius: 0;\n        padding: 0;\n    }\n\n    .p-inputnumber-buttons-stacked .p-inputnumber-input {\n        border-top-right-radius: 0;\n        border-bottom-right-radius: 0;\n    }\n\n    .p-inputnumber-buttons-stacked .p-button.p-inputnumber-button-down {\n        border-top-left-radius: 0;\n        border-top-right-radius: 0;\n        border-bottom-left-radius: 0;\n        padding: 0;\n    }\n\n    .p-inputnumber-buttons-stacked .p-inputnumber-button-group {\n        display: flex;\n        flex-direction: column;\n    }\n\n    .p-inputnumber-buttons-stacked .p-inputnumber-button-group .p-button.p-inputnumber-button {\n        flex: 1 1 auto;\n    }\n\n    .p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button-up {\n        order: 3;\n        border-top-left-radius: 0;\n        border-bottom-left-radius: 0;\n    }\n\n    .p-inputnumber-buttons-horizontal .p-inputnumber-input {\n        order: 2;\n        border-radius: 0;\n    }\n\n    .p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button-down {\n        order: 1;\n        border-top-right-radius: 0;\n        border-bottom-right-radius: 0;\n    }\n\n    .p-inputnumber-buttons-vertical {\n        flex-direction: column;\n    }\n\n    .p-inputnumber-buttons-vertical .p-button.p-inputnumber-button-up {\n        order: 1;\n        border-bottom-left-radius: 0;\n        border-bottom-right-radius: 0;\n        width: 100%;\n    }\n\n    .p-inputnumber-buttons-vertical .p-inputnumber-input {\n        order: 2;\n        border-radius: 0;\n        text-align: center;\n    }\n\n    .p-inputnumber-buttons-vertical .p-button.p-inputnumber-button-down {\n        order: 3;\n        border-top-left-radius: 0;\n        border-top-right-radius: 0;\n        width: 100%;\n    }\n\n    .p-inputnumber-input {\n        flex: 1 1 auto;\n    }\n\n    .p-fluid .p-inputnumber {\n        width: 100%;\n    }\n\n    .p-fluid .p-inputnumber .p-inputnumber-input {\n        width: 1%;\n    }\n\n    .p-fluid .p-inputnumber-buttons-vertical .p-inputnumber-input {\n        width: 100%;\n    }\n}\n";
    var classes = {
      root: function root(_ref) {
        var instance = _ref.instance,
          props = _ref.props;
        return ['p-inputnumber p-component p-inputwrapper', {
          'p-inputwrapper-filled': instance.filled,
          'p-inputwrapper-focus': instance.focused,
          'p-inputnumber-buttons-stacked': props.showButtons && props.buttonLayout === 'stacked',
          'p-inputnumber-buttons-horizontal': props.showButtons && props.buttonLayout === 'horizontal',
          'p-inputnumber-buttons-vertical': props.showButtons && props.buttonLayout === 'vertical'
        }];
      },
      input: 'p-inputnumber-input',
      buttonGroup: 'p-inputnumber-button-group',
      incrementButton: function incrementButton(_ref2) {
        var instance = _ref2.instance,
          props = _ref2.props;
        return ['p-inputnumber-button p-inputnumber-button-up', {
          'p-disabled': props.showButtons && props.max !== null && instance.maxBoundry()
        }];
      },
      decrementButton: function decrementButton(_ref3) {
        var instance = _ref3.instance,
          props = _ref3.props;
        return ['p-inputnumber-button p-inputnumber-button-down', {
          'p-disabled': props.showButtons && props.min !== null && instance.minBoundry()
        }];
      }
    };
    var InputNumberStyle = BaseStyle__default["default"].extend({
      name: 'inputnumber',
      css: css,
      classes: classes
    });

    return InputNumberStyle;

})(primevue.base.style);
