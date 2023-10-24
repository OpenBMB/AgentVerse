import BaseStyle from 'primevue/base/style';
import { ObjectUtils } from 'primevue/utils';

var css = "\n@layer primevue {\n    .p-autocomplete {\n        display: inline-flex;\n    }\n\n    .p-autocomplete-loader {\n        position: absolute;\n        top: 50%;\n        margin-top: -0.5rem;\n    }\n\n    .p-autocomplete-dd .p-autocomplete-input {\n        flex: 1 1 auto;\n        width: 1%;\n    }\n\n    .p-autocomplete-dd .p-autocomplete-input,\n    .p-autocomplete-dd .p-autocomplete-multiple-container {\n        border-top-right-radius: 0;\n        border-bottom-right-radius: 0;\n    }\n\n    .p-autocomplete-dd .p-autocomplete-dropdown {\n        border-top-left-radius: 0;\n        border-bottom-left-radius: 0px;\n    }\n\n    .p-autocomplete .p-autocomplete-panel {\n        min-width: 100%;\n    }\n\n    .p-autocomplete-panel {\n        position: absolute;\n        overflow: auto;\n        top: 0;\n        left: 0;\n    }\n\n    .p-autocomplete-items {\n        margin: 0;\n        padding: 0;\n        list-style-type: none;\n    }\n\n    .p-autocomplete-item {\n        cursor: pointer;\n        white-space: nowrap;\n        position: relative;\n        overflow: hidden;\n    }\n\n    .p-autocomplete-multiple-container {\n        margin: 0;\n        padding: 0;\n        list-style-type: none;\n        cursor: text;\n        overflow: hidden;\n        display: flex;\n        align-items: center;\n        flex-wrap: wrap;\n    }\n\n    .p-autocomplete-token {\n        cursor: default;\n        display: inline-flex;\n        align-items: center;\n        flex: 0 0 auto;\n    }\n\n    .p-autocomplete-token-icon {\n        cursor: pointer;\n    }\n\n    .p-autocomplete-input-token {\n        flex: 1 1 auto;\n        display: inline-flex;\n    }\n\n    .p-autocomplete-input-token input {\n        border: 0 none;\n        outline: 0 none;\n        background-color: transparent;\n        margin: 0;\n        padding: 0;\n        box-shadow: none;\n        border-radius: 0;\n        width: 100%;\n    }\n\n    .p-fluid .p-autocomplete {\n        display: flex;\n    }\n\n    .p-fluid .p-autocomplete-dd .p-autocomplete-input {\n        width: 1%;\n    }\n}\n";
var inlineStyles = {
  root: {
    position: 'relative'
  }
};
var classes = {
  root: function root(_ref) {
    var instance = _ref.instance,
      props = _ref.props;
    return ['p-autocomplete p-component p-inputwrapper', {
      'p-disabled': props.disabled,
      'p-focus': instance.focused,
      'p-autocomplete-dd': props.dropdown,
      'p-autocomplete-multiple': props.multiple,
      'p-inputwrapper-filled': props.modelValue || ObjectUtils.isNotEmpty(instance.inputValue),
      'p-inputwrapper-focus': instance.focused,
      'p-overlay-open': instance.overlayVisible
    }];
  },
  input: function input(_ref2) {
    var props = _ref2.props;
    return ['p-autocomplete-input p-inputtext p-component', {
      'p-autocomplete-dd-input': props.dropdown
    }];
  },
  container: 'p-autocomplete-multiple-container p-component p-inputtext',
  token: function token(_ref3) {
    var instance = _ref3.instance,
      i = _ref3.i;
    return ['p-autocomplete-token', {
      'p-focus': instance.focusedMultipleOptionIndex === i
    }];
  },
  tokenLabel: 'p-autocomplete-token-label',
  removeTokenIcon: 'p-autocomplete-token-icon',
  inputToken: 'p-autocomplete-input-token',
  loadingIcon: 'p-autocomplete-loader',
  dropdownButton: 'p-autocomplete-dropdown',
  panel: function panel(_ref4) {
    var instance = _ref4.instance;
    return ['p-autocomplete-panel p-component', {
      'p-input-filled': instance.$primevue.config.inputStyle === 'filled',
      'p-ripple-disabled': instance.$primevue.config.ripple === false
    }];
  },
  list: 'p-autocomplete-items',
  itemGroup: 'p-autocomplete-item-group',
  item: function item(_ref5) {
    var instance = _ref5.instance,
      option = _ref5.option,
      i = _ref5.i,
      getItemOptions = _ref5.getItemOptions;
    return ['p-autocomplete-item', {
      'p-highlight': instance.isSelected(option),
      'p-focus': instance.focusedOptionIndex === instance.getOptionIndex(i, getItemOptions),
      'p-disabled': instance.isOptionDisabled(option)
    }];
  },
  emptyMessage: 'p-autocomplete-empty-message'
};
var AutoCompleteStyle = BaseStyle.extend({
  name: 'autocomplete',
  css: css,
  classes: classes,
  inlineStyles: inlineStyles
});

export { AutoCompleteStyle as default };
