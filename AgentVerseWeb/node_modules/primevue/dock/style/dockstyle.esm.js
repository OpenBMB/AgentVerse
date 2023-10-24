import BaseStyle from 'primevue/base/style';

var css = "\n@layer primevue {\n    .p-dock {\n        position: absolute;\n        z-index: 1;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        pointer-events: none;\n    }\n\n    .p-dock-list-container {\n        display: flex;\n        pointer-events: auto;\n    }\n\n    .p-dock-list {\n        margin: 0;\n        padding: 0;\n        list-style: none;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n\n    .p-dock-item {\n        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n        will-change: transform;\n    }\n\n    .p-dock-link {\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: center;\n        position: relative;\n        overflow: hidden;\n        cursor: default;\n    }\n\n    .p-dock-item-second-prev,\n    .p-dock-item-second-next {\n        transform: scale(1.2);\n    }\n\n    .p-dock-item-prev,\n    .p-dock-item-next {\n        transform: scale(1.4);\n    }\n\n    .p-dock-item-current {\n        transform: scale(1.6);\n        z-index: 1;\n    }\n\n    /* Position */\n    /* top */\n    .p-dock-top {\n        left: 0;\n        top: 0;\n        width: 100%;\n    }\n\n    .p-dock-top .p-dock-item {\n        transform-origin: center top;\n    }\n\n    /* bottom */\n    .p-dock-bottom {\n        left: 0;\n        bottom: 0;\n        width: 100%;\n    }\n\n    .p-dock-bottom .p-dock-item {\n        transform-origin: center bottom;\n    }\n\n    /* right */\n    .p-dock-right {\n        right: 0;\n        top: 0;\n        height: 100%;\n    }\n\n    .p-dock-right .p-dock-item {\n        transform-origin: center right;\n    }\n\n    .p-dock-right .p-dock-list {\n        flex-direction: column;\n    }\n\n    /* left */\n    .p-dock-left {\n        left: 0;\n        top: 0;\n        height: 100%;\n    }\n\n    .p-dock-left .p-dock-item {\n        transform-origin: center left;\n    }\n\n    .p-dock-left .p-dock-list {\n        flex-direction: column;\n    }\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-dock p-component', "p-dock-".concat(props.position)];
  },
  container: 'p-dock-list-container',
  menu: 'p-dock-list',
  menuitem: function menuitem(_ref2) {
    var instance = _ref2.instance,
      processedItem = _ref2.processedItem,
      index = _ref2.index,
      id = _ref2.id;
    return ['p-dock-item', {
      'p-focus': instance.isItemActive(id),
      'p-disabled': instance.disabled(processedItem),
      'p-dock-item-second-prev': instance.currentIndex - 2 === index,
      'p-dock-item-prev': instance.currentIndex - 1 === index,
      'p-dock-item-current': instance.currentIndex === index,
      'p-dock-item-next': instance.currentIndex + 1 === index,
      'p-dock-item-second-next': instance.currentIndex + 2 === index
    }];
  },
  content: 'p-menuitem-content',
  action: function action(_ref3) {
    var props = _ref3.props,
      isActive = _ref3.isActive,
      isExactActive = _ref3.isExactActive;
    return ['p-dock-link', {
      'router-link-active': isActive,
      'router-link-active-exact': props.exact && isExactActive
    }];
  },
  icon: 'p-dock-icon'
};
var DockStyle = BaseStyle.extend({
  name: 'dock',
  css: css,
  classes: classes
});

export { DockStyle as default };
