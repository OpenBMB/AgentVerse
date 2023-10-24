this.primevue = this.primevue || {};
this.primevue.chips = this.primevue.chips || {};
this.primevue.chips.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var css = "\n@layer primevue {\n    .p-chips {\n        display: inline-flex;\n    }\n\n    .p-chips-multiple-container {\n        margin: 0;\n        padding: 0;\n        list-style-type: none;\n        cursor: text;\n        overflow: hidden;\n        display: flex;\n        align-items: center;\n        flex-wrap: wrap;\n    }\n\n    .p-chips-token {\n        cursor: default;\n        display: inline-flex;\n        align-items: center;\n        flex: 0 0 auto;\n    }\n\n    .p-chips-input-token {\n        flex: 1 1 auto;\n        display: inline-flex;\n    }\n\n    .p-chips-token-icon {\n        cursor: pointer;\n    }\n\n    .p-chips-input-token input {\n        border: 0 none;\n        outline: 0 none;\n        background-color: transparent;\n        margin: 0;\n        padding: 0;\n        box-shadow: none;\n        border-radius: 0;\n        width: 100%;\n    }\n\n    .p-fluid .p-chips {\n        display: flex;\n    }\n}\n";
    var classes = {
      root: function root(_ref) {
        var instance = _ref.instance,
          props = _ref.props;
        return ['p-chips p-component p-inputwrapper', {
          'p-disabled': props.disabled,
          'p-focus': instance.focused,
          'p-inputwrapper-filled': props.modelValue && props.modelValue.length || instance.inputValue && instance.inputValue.length,
          'p-inputwrapper-focus': instance.focused
        }];
      },
      container: 'p-inputtext p-chips-multiple-container',
      token: function token(_ref2) {
        var state = _ref2.state,
          index = _ref2.index;
        return ['p-chips-token', {
          'p-focus': state.focusedIndex === index
        }];
      },
      label: 'p-chips-token-label',
      removeTokenIcon: 'p-chips-token-icon',
      inputToken: 'p-chips-input-token'
    };
    var ChipsStyle = BaseStyle__default["default"].extend({
      name: 'chips',
      css: css,
      classes: classes
    });

    return ChipsStyle;

})(primevue.base.style);
