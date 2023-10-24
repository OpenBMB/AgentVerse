'use strict';

var BaseStyle = require('primevue/base/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

var css = "\n@layer primevue {\n    .p-overlaypanel {\n        margin-top: 10px;\n    }\n\n    .p-overlaypanel-flipped {\n        margin-top: 0;\n        margin-bottom: 10px;\n    }\n\n    .p-overlaypanel-close {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        overflow: hidden;\n        position: relative;\n    }\n\n    /* Animation */\n    .p-overlaypanel-enter-from {\n        opacity: 0;\n        transform: scaleY(0.8);\n    }\n\n    .p-overlaypanel-leave-to {\n        opacity: 0;\n    }\n\n    .p-overlaypanel-enter-active {\n        transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1), opacity 0.12s cubic-bezier(0, 0, 0.2, 1);\n    }\n\n    .p-overlaypanel-leave-active {\n        transition: opacity 0.1s linear;\n    }\n\n    .p-overlaypanel:after,\n    .p-overlaypanel:before {\n        bottom: 100%;\n        left: calc(var(--overlayArrowLeft, 0) + 1.25rem);\n        content: ' ';\n        height: 0;\n        width: 0;\n        position: absolute;\n        pointer-events: none;\n    }\n\n    .p-overlaypanel:after {\n        border-width: 8px;\n        margin-left: -8px;\n    }\n\n    .p-overlaypanel:before {\n        border-width: 10px;\n        margin-left: -10px;\n    }\n\n    .p-overlaypanel-flipped:after,\n    .p-overlaypanel-flipped:before {\n        bottom: auto;\n        top: 100%;\n    }\n\n    .p-overlaypanel.p-overlaypanel-flipped:after {\n        border-bottom-color: transparent;\n    }\n\n    .p-overlaypanel.p-overlaypanel-flipped:before {\n        border-bottom-color: transparent;\n    }\n}\n";
var classes = {
  root: function root(_ref) {
    var instance = _ref.instance;
    return ['p-overlaypanel p-component', {
      'p-input-filled': instance.$primevue.config.inputStyle === 'filled',
      'p-ripple-disabled': instance.$primevue.config.ripple === false
    }];
  },
  content: 'p-overlaypanel-content',
  closeButton: 'p-overlaypanel-close p-link',
  closeIcon: 'p-overlaypanel-close-icon'
};
var OverlayPanelStyle = BaseStyle__default["default"].extend({
  name: 'overlaypanel',
  css: css,
  classes: classes
});

module.exports = OverlayPanelStyle;
