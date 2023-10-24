import BaseStyle from 'primevue/base/style';

var css = "\n@layer primevue {\n    .p-sidebar-mask {\n        display: none;\n        pointer-events: none;\n        background-color: transparent;\n        transition-property: background-color;\n    }\n\n    .p-sidebar-mask.p-component-overlay {\n        pointer-events: auto;\n    }\n\n    .p-sidebar-visible {\n        display: flex;\n    }\n\n    .p-sidebar {\n        display: flex;\n        flex-direction: column;\n        pointer-events: auto;\n        transform: translate3d(0px, 0px, 0px);\n        position: relative;\n        transition: transform 0.3s;\n    }\n\n    .p-sidebar-content {\n        overflow-y: auto;\n        flex-grow: 1;\n    }\n\n    .p-sidebar-header {\n        display: flex;\n        align-items: center;\n        justify-content: flex-end;\n        flex-shrink: 0;\n    }\n\n    .p-sidebar-icon {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        overflow: hidden;\n        position: relative;\n    }\n\n    .p-sidebar-full .p-sidebar {\n        transition: none;\n        transform: none;\n        width: 100vw !important;\n        height: 100vh !important;\n        max-height: 100%;\n        top: 0px !important;\n        left: 0px !important;\n    }\n\n    /* Animation */\n    /* Center */\n    .p-sidebar-left .p-sidebar-enter-from,\n    .p-sidebar-left .p-sidebar-leave-to {\n        transform: translateX(-100%);\n    }\n    .p-sidebar-right .p-sidebar-enter-from,\n    .p-sidebar-right .p-sidebar-leave-to {\n        transform: translateX(100%);\n    }\n    .p-sidebar-top .p-sidebar-enter-from,\n    .p-sidebar-top .p-sidebar-leave-to {\n        transform: translateY(-100%);\n    }\n    .p-sidebar-bottom .p-sidebar-enter-from,\n    .p-sidebar-bottom .p-sidebar-leave-to {\n        transform: translateY(100%);\n    }\n    .p-sidebar-full .p-sidebar-enter-from,\n    .p-sidebar-full .p-sidebar-leave-to {\n        opacity: 0;\n    }\n    .p-sidebar-full .p-sidebar-enter-active,\n    .p-sidebar-full .p-sidebar-leave-active {\n        transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);\n    }\n\n    /* Size */\n    .p-sidebar-left .p-sidebar {\n        width: 20rem;\n        height: 100%;\n    }\n\n    .p-sidebar-right .p-sidebar {\n        width: 20rem;\n        height: 100%;\n    }\n\n    .p-sidebar-top .p-sidebar {\n        height: 10rem;\n        width: 100%;\n    }\n\n    .p-sidebar-bottom .p-sidebar {\n        height: 10rem;\n        width: 100%;\n    }\n\n    .p-sidebar-left .p-sidebar-sm,\n    .p-sidebar-right .p-sidebar-sm {\n        width: 20rem;\n    }\n\n    .p-sidebar-left .p-sidebar-md,\n    .p-sidebar-right .p-sidebar-md {\n        width: 40rem;\n    }\n\n    .p-sidebar-left .p-sidebar-lg,\n    .p-sidebar-right .p-sidebar-lg {\n        width: 60rem;\n    }\n\n    .p-sidebar-top .p-sidebar-sm,\n    .p-sidebar-bottom .p-sidebar-sm {\n        height: 10rem;\n    }\n\n    .p-sidebar-top .p-sidebar-md,\n    .p-sidebar-bottom .p-sidebar-md {\n        height: 20rem;\n    }\n\n    .p-sidebar-top .p-sidebar-lg,\n    .p-sidebar-bottom .p-sidebar-lg {\n        height: 30rem;\n    }\n\n    .p-sidebar-left .p-sidebar-content,\n    .p-sidebar-right .p-sidebar-content,\n    .p-sidebar-top .p-sidebar-content,\n    .p-sidebar-bottom .p-sidebar-content {\n        width: 100%;\n        height: 100%;\n    }\n\n    @media screen and (max-width: 64em) {\n        .p-sidebar-left .p-sidebar-lg,\n        .p-sidebar-left .p-sidebar-md,\n        .p-sidebar-right .p-sidebar-lg,\n        .p-sidebar-right .p-sidebar-md {\n            width: 20rem;\n        }\n    }\n}\n";
var inlineStyles = {
  mask: function mask(_ref) {
    var position = _ref.position;
    return {
      position: 'fixed',
      height: '100%',
      width: '100%',
      left: 0,
      top: 0,
      display: 'flex',
      justifyContent: position === 'left' ? 'flex-start' : position === 'right' ? 'flex-end' : 'center',
      alignItems: position === 'top' ? 'flex-start' : position === 'bottom' ? 'flex-end' : 'center'
    };
  }
};
var classes = {
  mask: function mask(_ref2) {
    var instance = _ref2.instance,
      props = _ref2.props;
    var positions = ['left', 'right', 'top', 'bottom'];
    var pos = positions.find(function (item) {
      return item === props.position;
    });
    return ['p-sidebar-mask', {
      'p-component-overlay p-component-overlay-enter': props.modal,
      'p-sidebar-mask-scrollblocker': props.blockScroll,
      'p-sidebar-visible': instance.containerVisible,
      'p-sidebar-full': instance.fullScreen
    }, pos ? "p-sidebar-".concat(pos) : ''];
  },
  root: function root(_ref3) {
    var instance = _ref3.instance;
    return ['p-sidebar p-component', {
      'p-input-filled': instance.$primevue.config.inputStyle === 'filled',
      'p-ripple-disabled': instance.$primevue.config.ripple === false,
      'p-sidebar-full': instance.fullScreen
    }];
  },
  header: 'p-sidebar-header',
  headerContent: 'p-sidebar-header-content',
  closeButton: 'p-sidebar-close p-sidebar-icon p-link',
  closeIcon: 'p-sidebar-close-icon',
  content: 'p-sidebar-content'
};
var SidebarStyle = BaseStyle.extend({
  name: 'sidebar',
  css: css,
  classes: classes,
  inlineStyles: inlineStyles
});

export { SidebarStyle as default };
