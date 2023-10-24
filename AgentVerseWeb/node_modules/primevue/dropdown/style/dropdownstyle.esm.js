import BaseStyle from 'primevue/base/style';

var css = "\n@layer primevue {\n    .p-dropdown {\n        display: inline-flex;\n        cursor: pointer;\n        position: relative;\n        user-select: none;\n    }\n\n    .p-dropdown-clear-icon {\n        position: absolute;\n        top: 50%;\n        margin-top: -0.5rem;\n    }\n\n    .p-dropdown-trigger {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n    }\n\n    .p-dropdown-label {\n        display: block;\n        white-space: nowrap;\n        overflow: hidden;\n        flex: 1 1 auto;\n        width: 1%;\n        text-overflow: ellipsis;\n        cursor: pointer;\n    }\n\n    .p-dropdown-label-empty {\n        overflow: hidden;\n        opacity: 0;\n    }\n\n    input.p-dropdown-label {\n        cursor: default;\n    }\n\n    .p-dropdown .p-dropdown-panel {\n        min-width: 100%;\n    }\n\n    .p-dropdown-panel {\n        position: absolute;\n        top: 0;\n        left: 0;\n    }\n\n    .p-dropdown-items-wrapper {\n        overflow: auto;\n    }\n\n    .p-dropdown-item {\n        cursor: pointer;\n        font-weight: normal;\n        white-space: nowrap;\n        position: relative;\n        overflow: hidden;\n    }\n\n    .p-dropdown-item-group {\n        cursor: auto;\n    }\n\n    .p-dropdown-items {\n        margin: 0;\n        padding: 0;\n        list-style-type: none;\n    }\n\n    .p-dropdown-filter {\n        width: 100%;\n    }\n\n    .p-dropdown-filter-container {\n        position: relative;\n    }\n\n    .p-dropdown-filter-icon {\n        position: absolute;\n        top: 50%;\n        margin-top: -0.5rem;\n    }\n\n    .p-fluid .p-dropdown {\n        display: flex;\n    }\n\n    .p-fluid .p-dropdown .p-dropdown-label {\n        width: 1%;\n    }\n}\n";
var classes = {
  root: function root(_ref) {
    var instance = _ref.instance,
      props = _ref.props,
      state = _ref.state;
    return ['p-dropdown p-component p-inputwrapper', {
      'p-disabled': props.disabled,
      'p-dropdown-clearable': props.showClear && !props.disabled,
      'p-focus': state.focused,
      'p-inputwrapper-filled': instance.hasSelectedOption,
      'p-inputwrapper-focus': state.focused || state.overlayVisible,
      'p-overlay-open': state.overlayVisible
    }];
  },
  input: function input(_ref2) {
    var instance = _ref2.instance,
      props = _ref2.props;
    return ['p-dropdown-label p-inputtext', {
      'p-placeholder': !props.editable && instance.label === props.placeholder,
      'p-dropdown-label-empty': !props.editable && !instance.$slots['value'] && (instance.label === 'p-emptylabel' || instance.label.length === 0)
    }];
  },
  clearIcon: 'p-dropdown-clear-icon',
  trigger: 'p-dropdown-trigger',
  loadingicon: 'p-dropdown-trigger-icon',
  dropdownIcon: 'p-dropdown-trigger-icon',
  panel: function panel(_ref3) {
    var instance = _ref3.instance;
    return ['p-dropdown-panel p-component', {
      'p-input-filled': instance.$primevue.config.inputStyle === 'filled',
      'p-ripple-disabled': instance.$primevue.config.ripple === false
    }];
  },
  header: 'p-dropdown-header',
  filterContainer: 'p-dropdown-filter-container',
  filterInput: 'p-dropdown-filter p-inputtext p-component',
  filterIcon: 'p-dropdown-filter-icon',
  wrapper: 'p-dropdown-items-wrapper',
  list: 'p-dropdown-items',
  itemGroup: 'p-dropdown-item-group',
  item: function item(_ref4) {
    var instance = _ref4.instance,
      state = _ref4.state,
      option = _ref4.option,
      focusedOption = _ref4.focusedOption;
    return ['p-dropdown-item', {
      'p-highlight': instance.isSelected(option),
      'p-focus': state.focusedOptionIndex === focusedOption,
      'p-disabled': instance.isOptionDisabled(option)
    }];
  },
  emptyMessage: 'p-dropdown-empty-message'
};
var DropdownStyle = BaseStyle.extend({
  name: 'dropdown',
  css: css,
  classes: classes
});

export { DropdownStyle as default };
