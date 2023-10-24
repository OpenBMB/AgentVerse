this.primevue = this.primevue || {};
this.primevue.message = this.primevue.message || {};
this.primevue.message.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var css = "\n@layer primevue {\n    .p-message-wrapper {\n        display: flex;\n        align-items: center;\n    }\n\n    .p-message-icon {\n        flex-shrink: 0;\n    }\n\n    .p-message-close {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n    }\n\n    .p-message-close.p-link {\n        margin-left: auto;\n        overflow: hidden;\n        position: relative;\n    }\n\n    .p-message-enter-from {\n        opacity: 0;\n    }\n\n    .p-message-enter-active {\n        transition: opacity 0.3s;\n    }\n\n    .p-message.p-message-leave-from {\n        max-height: 1000px;\n    }\n\n    .p-message.p-message-leave-to {\n        max-height: 0;\n        opacity: 0;\n        margin: 0 !important;\n    }\n\n    .p-message-leave-active {\n        overflow: hidden;\n        transition: max-height 0.3s cubic-bezier(0, 1, 0, 1), opacity 0.3s, margin 0.15s;\n    }\n\n    .p-message-leave-active .p-message-close {\n        display: none;\n    }\n}\n";
    var classes = {
      root: function root(_ref) {
        var props = _ref.props;
        return 'p-message p-component p-message-' + props.severity;
      },
      wrapper: 'p-message-wrapper',
      icon: 'p-message-icon',
      text: 'p-message-text',
      closeButton: 'p-message-close p-link',
      closeIcon: 'p-message-close-icon'
    };
    var MessageStyle = BaseStyle__default["default"].extend({
      name: 'message',
      css: css,
      classes: classes
    });

    return MessageStyle;

})(primevue.base.style);
