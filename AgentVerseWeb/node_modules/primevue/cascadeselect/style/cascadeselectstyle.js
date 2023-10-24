this.primevue = this.primevue || {};
this.primevue.cascadeselect = this.primevue.cascadeselect || {};
this.primevue.cascadeselect.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var css = "\n@layer primevue {\n    .p-cascadeselect {\n        display: inline-flex;\n        cursor: pointer;\n        user-select: none;\n    }\n\n    .p-cascadeselect-trigger {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n    }\n\n    .p-cascadeselect-label {\n        display: block;\n        white-space: nowrap;\n        overflow: hidden;\n        flex: 1 1 auto;\n        width: 1%;\n        text-overflow: ellipsis;\n        cursor: pointer;\n    }\n\n    .p-cascadeselect-label-empty {\n        overflow: hidden;\n        visibility: hidden;\n    }\n\n    .p-cascadeselect .p-cascadeselect-panel {\n        min-width: 100%;\n    }\n\n    .p-cascadeselect-item {\n        cursor: pointer;\n        font-weight: normal;\n        white-space: nowrap;\n    }\n\n    .p-cascadeselect-item-content {\n        display: flex;\n        align-items: center;\n        overflow: hidden;\n        position: relative;\n    }\n\n    .p-cascadeselect-group-icon {\n        margin-left: auto;\n    }\n\n    .p-cascadeselect-items {\n        margin: 0;\n        padding: 0;\n        list-style-type: none;\n        min-width: 100%;\n    }\n\n    .p-fluid .p-cascadeselect {\n        display: flex;\n    }\n\n    .p-fluid .p-cascadeselect .p-cascadeselect-label {\n        width: 1%;\n    }\n\n    .p-cascadeselect-sublist {\n        position: absolute;\n        min-width: 100%;\n        z-index: 1;\n        display: none;\n    }\n\n    .p-cascadeselect-item-active {\n        overflow: visible !important;\n    }\n\n    .p-cascadeselect-item-active > .p-cascadeselect-sublist {\n        display: block;\n        left: 100%;\n        top: 0;\n    }\n}\n";
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
        return ['p-cascadeselect p-component p-inputwrapper', {
          'p-disabled': props.disabled,
          'p-focus': instance.focused,
          'p-inputwrapper-filled': props.modelValue,
          'p-inputwrapper-focus': instance.focused || instance.overlayVisible,
          'p-overlay-open': instance.overlayVisible
        }];
      },
      label: function label(_ref3) {
        var instance = _ref3.instance,
          props = _ref3.props;
        return ['p-cascadeselect-label p-inputtext', {
          'p-placeholder': instance.label === props.placeholder,
          'p-cascadeselect-label-empty': !instance.$slots['value'] && (instance.label === 'p-emptylabel' || instance.label.length === 0)
        }];
      },
      dropdownButton: 'p-cascadeselect-trigger',
      loadingIcon: 'p-cascadeselect-trigger-icon',
      dropdownIcon: 'p-cascadeselect-trigger-icon',
      panel: function panel(_ref4) {
        var instance = _ref4.instance;
        return ['p-cascadeselect-panel p-component', {
          'p-input-filled': instance.$primevue.config.inputStyle === 'filled',
          'p-ripple-disabled': instance.$primevue.config.ripple === false
        }];
      },
      wrapper: 'p-cascadeselect-items-wrapper',
      list: 'p-cascadeselect-panel p-cascadeselect-items',
      item: function item(_ref5) {
        var instance = _ref5.instance,
          processedOption = _ref5.processedOption;
        return ['p-cascadeselect-item', {
          'p-cascadeselect-item-group': instance.isOptionGroup(processedOption),
          'p-cascadeselect-item-active p-highlight': instance.isOptionActive(processedOption),
          'p-focus': instance.isOptionFocused(processedOption),
          'p-disabled': instance.isOptionDisabled(processedOption)
        }];
      },
      content: 'p-cascadeselect-item-content',
      text: 'p-cascadeselect-item-text',
      groupIcon: 'p-cascadeselect-group-icon',
      sublist: 'p-cascadeselect-sublist'
    };
    var CascadeSelectStyle = BaseStyle__default["default"].extend({
      name: 'cascadeselect',
      css: css,
      classes: classes,
      inlineStyles: inlineStyles
    });

    return CascadeSelectStyle;

})(primevue.base.style);
