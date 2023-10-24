this.primevue = this.primevue || {};
this.primevue.dialog = this.primevue.dialog || {};
this.primevue.dialog.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var css = "\n@layer primevue {\n    .p-dialog-mask.p-component-overlay {\n        pointer-events: auto;\n    }\n\n    .p-dialog {\n        max-height: 90%;\n        transform: scale(1);\n    }\n\n    .p-dialog-content {\n        overflow-y: auto;\n    }\n\n    .p-dialog-header {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        flex-shrink: 0;\n    }\n\n    .p-dialog-footer {\n        flex-shrink: 0;\n    }\n\n    .p-dialog .p-dialog-header-icons {\n        display: flex;\n        align-items: center;\n    }\n\n    .p-dialog .p-dialog-header-icon {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        overflow: hidden;\n        position: relative;\n    }\n\n    /* Fluid */\n    .p-fluid .p-dialog-footer .p-button {\n        width: auto;\n    }\n\n    /* Animation */\n    /* Center */\n    .p-dialog-enter-active {\n        transition: all 150ms cubic-bezier(0, 0, 0.2, 1);\n    }\n    .p-dialog-leave-active {\n        transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);\n    }\n    .p-dialog-enter-from,\n    .p-dialog-leave-to {\n        opacity: 0;\n        transform: scale(0.7);\n    }\n\n    /* Top, Bottom, Left, Right, Top* and Bottom* */\n    .p-dialog-top .p-dialog,\n    .p-dialog-bottom .p-dialog,\n    .p-dialog-left .p-dialog,\n    .p-dialog-right .p-dialog,\n    .p-dialog-topleft .p-dialog,\n    .p-dialog-topright .p-dialog,\n    .p-dialog-bottomleft .p-dialog,\n    .p-dialog-bottomright .p-dialog {\n        margin: 0.75rem;\n        transform: translate3d(0px, 0px, 0px);\n    }\n    .p-dialog-top .p-dialog-enter-active,\n    .p-dialog-top .p-dialog-leave-active,\n    .p-dialog-bottom .p-dialog-enter-active,\n    .p-dialog-bottom .p-dialog-leave-active,\n    .p-dialog-left .p-dialog-enter-active,\n    .p-dialog-left .p-dialog-leave-active,\n    .p-dialog-right .p-dialog-enter-active,\n    .p-dialog-right .p-dialog-leave-active,\n    .p-dialog-topleft .p-dialog-enter-active,\n    .p-dialog-topleft .p-dialog-leave-active,\n    .p-dialog-topright .p-dialog-enter-active,\n    .p-dialog-topright .p-dialog-leave-active,\n    .p-dialog-bottomleft .p-dialog-enter-active,\n    .p-dialog-bottomleft .p-dialog-leave-active,\n    .p-dialog-bottomright .p-dialog-enter-active,\n    .p-dialog-bottomright .p-dialog-leave-active {\n        transition: all 0.3s ease-out;\n    }\n    .p-dialog-top .p-dialog-enter-from,\n    .p-dialog-top .p-dialog-leave-to {\n        transform: translate3d(0px, -100%, 0px);\n    }\n    .p-dialog-bottom .p-dialog-enter-from,\n    .p-dialog-bottom .p-dialog-leave-to {\n        transform: translate3d(0px, 100%, 0px);\n    }\n    .p-dialog-left .p-dialog-enter-from,\n    .p-dialog-left .p-dialog-leave-to,\n    .p-dialog-topleft .p-dialog-enter-from,\n    .p-dialog-topleft .p-dialog-leave-to,\n    .p-dialog-bottomleft .p-dialog-enter-from,\n    .p-dialog-bottomleft .p-dialog-leave-to {\n        transform: translate3d(-100%, 0px, 0px);\n    }\n    .p-dialog-right .p-dialog-enter-from,\n    .p-dialog-right .p-dialog-leave-to,\n    .p-dialog-topright .p-dialog-enter-from,\n    .p-dialog-topright .p-dialog-leave-to,\n    .p-dialog-bottomright .p-dialog-enter-from,\n    .p-dialog-bottomright .p-dialog-leave-to {\n        transform: translate3d(100%, 0px, 0px);\n    }\n\n    /* Maximize */\n    .p-dialog-maximized {\n        -webkit-transition: none;\n        transition: none;\n        transform: none;\n        width: 100vw !important;\n        height: 100vh !important;\n        top: 0px !important;\n        left: 0px !important;\n        max-height: 100%;\n        height: 100%;\n    }\n    .p-dialog-maximized .p-dialog-content {\n        flex-grow: 1;\n    }\n\n    .p-confirm-dialog .p-dialog-content {\n        display: flex;\n        align-items: center;\n    }\n}\n";

    /* Position */
    var inlineStyles = {
      mask: function mask(_ref) {
        var position = _ref.position,
          modal = _ref.modal;
        return {
          position: 'fixed',
          height: '100%',
          width: '100%',
          left: 0,
          top: 0,
          display: 'flex',
          justifyContent: position === 'left' || position === 'topleft' || position === 'bottomleft' ? 'flex-start' : position === 'right' || position === 'topright' || position === 'bottomright' ? 'flex-end' : 'center',
          alignItems: position === 'top' || position === 'topleft' || position === 'topright' ? 'flex-start' : position === 'bottom' || position === 'bottomleft' || position === 'bottomright' ? 'flex-end' : 'center',
          pointerEvents: modal ? 'auto' : 'none'
        };
      },
      root: {
        display: 'flex',
        flexDirection: 'column',
        pointerEvents: 'auto'
      }
    };
    var classes = {
      mask: function mask(_ref2) {
        var props = _ref2.props;
        var positions = ['left', 'right', 'top', 'topleft', 'topright', 'bottom', 'bottomleft', 'bottomright'];
        var pos = positions.find(function (item) {
          return item === props.position;
        });
        return ['p-dialog-mask', {
          'p-component-overlay p-component-overlay-enter': props.modal
        }, pos ? "p-dialog-".concat(pos) : ''];
      },
      root: function root(_ref3) {
        var props = _ref3.props,
          instance = _ref3.instance;
        return ['p-dialog p-component', {
          'p-dialog-rtl': props.rtl,
          'p-dialog-maximized': props.maximizable && instance.maximized,
          'p-input-filled': instance.$primevue.config.inputStyle === 'filled',
          'p-ripple-disabled': instance.$primevue.config.ripple === false
        }];
      },
      header: 'p-dialog-header',
      headerTitle: 'p-dialog-title',
      headerIcons: 'p-dialog-header-icons',
      maximizableButton: 'p-dialog-header-icon p-dialog-header-maximize p-link',
      maximizableIcon: 'p-dialog-header-maximize-icon',
      closeButton: 'p-dialog-header-icon p-dialog-header-close p-link',
      closeButtonIcon: 'p-dialog-header-close-icon',
      content: 'p-dialog-content',
      footer: 'p-dialog-footer'
    };
    var DialogStyle = BaseStyle__default["default"].extend({
      name: 'dialog',
      css: css,
      classes: classes,
      inlineStyles: inlineStyles
    });

    return DialogStyle;

})(primevue.base.style);
