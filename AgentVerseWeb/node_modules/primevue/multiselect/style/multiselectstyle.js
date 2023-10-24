this.primevue = this.primevue || {};
this.primevue.multiselect = this.primevue.multiselect || {};
this.primevue.multiselect.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var css = "\n@layer primevue {\n    .p-multiselect {\n        display: inline-flex;\n        cursor: pointer;\n        user-select: none;\n    }\n\n    .p-multiselect-trigger {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n    }\n\n    .p-multiselect-label-container {\n        overflow: hidden;\n        flex: 1 1 auto;\n        cursor: pointer;\n    }\n\n    .p-multiselect-label {\n        display: block;\n        white-space: nowrap;\n        cursor: pointer;\n        overflow: hidden;\n        text-overflow: ellipsis;\n    }\n\n    .p-multiselect-label-empty {\n        overflow: hidden;\n        visibility: hidden;\n    }\n\n    .p-multiselect-token {\n        cursor: default;\n        display: inline-flex;\n        align-items: center;\n        flex: 0 0 auto;\n    }\n\n    .p-multiselect-token-icon {\n        cursor: pointer;\n    }\n\n    .p-multiselect .p-multiselect-panel {\n        min-width: 100%;\n    }\n\n    .p-multiselect-items-wrapper {\n        overflow: auto;\n    }\n\n    .p-multiselect-items {\n        margin: 0;\n        padding: 0;\n        list-style-type: none;\n    }\n\n    .p-multiselect-item {\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        font-weight: normal;\n        white-space: nowrap;\n        position: relative;\n        overflow: hidden;\n    }\n\n    .p-multiselect-item-group {\n        cursor: auto;\n    }\n\n    .p-multiselect-header {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n    }\n\n    .p-multiselect-filter-container {\n        position: relative;\n        flex: 1 1 auto;\n    }\n\n    .p-multiselect-filter-icon {\n        position: absolute;\n        top: 50%;\n        margin-top: -0.5rem;\n    }\n\n    .p-multiselect-filter-container .p-inputtext {\n        width: 100%;\n    }\n\n    .p-multiselect-close {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n        overflow: hidden;\n        position: relative;\n        margin-left: auto;\n    }\n\n    .p-fluid .p-multiselect {\n        display: flex;\n    }\n}\n";
    var inlineStyles = {
      root: function root(_ref) {
        var props = _ref.props;
        return {
          position: props.appendTo === 'self' ? 'relative' : undefined
        };
      }
    };
    var classes = {
      root: function root(_ref2) {
        var instance = _ref2.instance,
          props = _ref2.props;
        return ['p-multiselect p-component p-inputwrapper', {
          'p-multiselect-chip': props.display === 'chip',
          'p-disabled': props.disabled,
          'p-focus': instance.focused,
          'p-inputwrapper-filled': props.modelValue && props.modelValue.length,
          'p-inputwrapper-focus': instance.focused || instance.overlayVisible,
          'p-overlay-open': instance.overlayVisible
        }];
      },
      labelContainer: 'p-multiselect-label-container',
      label: function label(_ref3) {
        var instance = _ref3.instance,
          props = _ref3.props;
        return ['p-multiselect-label', {
          'p-placeholder': instance.label === props.placeholder,
          'p-multiselect-label-empty': !props.placeholder && (!props.modelValue || props.modelValue.length === 0)
        }];
      },
      token: 'p-multiselect-token',
      tokenLabel: 'p-multiselect-token-label',
      removeTokenIcon: 'p-multiselect-token-icon',
      trigger: 'p-multiselect-trigger',
      loadingIcon: 'p-multiselect-trigger-icon',
      dropdownIcon: 'p-multiselect-trigger-icon',
      panel: function panel(_ref4) {
        var instance = _ref4.instance;
        return ['p-multiselect-panel p-component', {
          'p-input-filled': instance.$primevue.config.inputStyle === 'filled',
          'p-ripple-disabled': instance.$primevue.config.ripple === false
        }];
      },
      header: 'p-multiselect-header',
      headerCheckboxContainer: function headerCheckboxContainer(_ref5) {
        var instance = _ref5.instance;
        return ['p-checkbox p-component', {
          'p-checkbox-checked': instance.allSelected,
          'p-checkbox-focused': instance.headerCheckboxFocused
        }];
      },
      headerCheckbox: function headerCheckbox(_ref6) {
        var instance = _ref6.instance;
        return ['p-checkbox-box', {
          'p-highlight': instance.allSelected,
          'p-focus': instance.headerCheckboxFocused
        }];
      },
      headerCheckboxIcon: 'p-checkbox-icon',
      filterContainer: 'p-multiselect-filter-container',
      filterInput: 'p-multiselect-filter p-inputtext p-component',
      filterIcon: 'p-multiselect-filter-icon',
      closeButton: 'p-multiselect-close p-link',
      closeIcon: 'p-multiselect-close-icon',
      wrapper: 'p-multiselect-items-wrapper',
      list: 'p-multiselect-items p-component',
      itemGroup: 'p-multiselect-item-group',
      item: function item(_ref7) {
        var instance = _ref7.instance,
          option = _ref7.option,
          index = _ref7.index,
          getItemOptions = _ref7.getItemOptions;
        return ['p-multiselect-item', {
          'p-highlight': instance.isSelected(option),
          'p-focus': instance.focusedOptionIndex === instance.getOptionIndex(index, getItemOptions),
          'p-disabled': instance.isOptionDisabled(option)
        }];
      },
      checkboxContainer: 'p-checkbox p-component',
      checkbox: function checkbox(_ref8) {
        var instance = _ref8.instance,
          option = _ref8.option;
        return ['p-checkbox-box', {
          'p-highlight': instance.isSelected(option)
        }];
      },
      checkboxIcon: 'p-checkbox-icon',
      emptyMessage: 'p-multiselect-empty-message'
    };
    var MultiSelectStyle = BaseStyle__default["default"].extend({
      name: 'multiselect',
      css: css,
      classes: classes,
      inlineStyles: inlineStyles
    });

    return MultiSelectStyle;

})(primevue.base.style);
