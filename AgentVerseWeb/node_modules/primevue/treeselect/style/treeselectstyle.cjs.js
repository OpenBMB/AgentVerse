'use strict';

var BaseStyle = require('primevue/base/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

var css = "\n@layer primevue {\n    .p-treeselect {\n        display: inline-flex;\n        cursor: pointer;\n        user-select: none;\n    }\n\n    .p-treeselect-trigger {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n    }\n\n    .p-treeselect-label-container {\n        overflow: hidden;\n        flex: 1 1 auto;\n        cursor: pointer;\n    }\n\n    .p-treeselect-label {\n        display: block;\n        white-space: nowrap;\n        cursor: pointer;\n        overflow: hidden;\n        text-overflow: ellipsis;\n    }\n\n    .p-treeselect-label-empty {\n        overflow: hidden;\n        visibility: hidden;\n    }\n\n    .p-treeselect-token {\n        cursor: default;\n        display: inline-flex;\n        align-items: center;\n        flex: 0 0 auto;\n    }\n\n    .p-treeselect .p-treeselect-panel {\n        min-width: 100%;\n    }\n\n    .p-treeselect-items-wrapper {\n        overflow: auto;\n    }\n\n    .p-fluid .p-treeselect {\n        display: flex;\n    }\n}\n";
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
    return ['p-treeselect p-component p-inputwrapper', {
      'p-treeselect-chip': props.display === 'chip',
      'p-disabled': props.disabled,
      'p-focus': instance.focused,
      'p-inputwrapper-filled': !instance.emptyValue,
      'p-inputwrapper-focus': instance.focused || instance.overlayVisible
    }];
  },
  labelContainer: 'p-treeselect-label-container',
  label: function label(_ref3) {
    var instance = _ref3.instance,
      props = _ref3.props;
    return ['p-treeselect-label', {
      'p-placeholder': instance.label === props.placeholder,
      'p-treeselect-label-empty': !props.placeholder && instance.emptyValue
    }];
  },
  token: 'p-treeselect-token',
  tokenLabel: 'p-treeselect-token-label',
  trigger: 'p-treeselect-trigger',
  triggerIcon: 'p-treeselect-trigger-icon',
  panel: function panel(_ref4) {
    var instance = _ref4.instance;
    return ['p-treeselect-panel p-component', {
      'p-input-filled': instance.$primevue.config.inputStyle === 'filled',
      'p-ripple-disabled': instance.$primevue.config.ripple === false
    }];
  },
  wrapper: 'p-treeselect-items-wrapper',
  emptyMessage: 'p-treeselect-empty-message'
};
var TreeSelectStyle = BaseStyle__default["default"].extend({
  name: 'treeselect',
  css: css,
  classes: classes,
  inlineStyles: inlineStyles
});

module.exports = TreeSelectStyle;
