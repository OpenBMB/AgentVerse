import BaseStyle from 'primevue/base/style';

var css = "\n@layer primevue {\n    .p-panelmenu .p-panelmenu-header-action {\n        display: flex;\n        align-items: center;\n        user-select: none;\n        cursor: pointer;\n        position: relative;\n        text-decoration: none;\n    }\n\n    .p-panelmenu .p-panelmenu-header-action:focus {\n        z-index: 1;\n    }\n\n    .p-panelmenu .p-submenu-list {\n        margin: 0;\n        padding: 0;\n        list-style: none;\n    }\n\n    .p-panelmenu .p-menuitem-link {\n        display: flex;\n        align-items: center;\n        user-select: none;\n        cursor: pointer;\n        text-decoration: none;\n        position: relative;\n        overflow: hidden;\n    }\n\n    .p-panelmenu .p-menuitem-text {\n        line-height: 1;\n    }\n}\n";
var classes = {
  root: 'p-panelmenu p-component',
  panel: 'p-panelmenu-panel',
  header: function header(_ref) {
    var instance = _ref.instance,
      item = _ref.item;
    return ['p-panelmenu-header', {
      'p-highlight': instance.isItemActive(item),
      'p-disabled': instance.isItemDisabled(item)
    }];
  },
  headerContent: 'p-panelmenu-header-content',
  headerAction: function headerAction(_ref2) {
    var instance = _ref2.instance,
      isActive = _ref2.isActive,
      isExactActive = _ref2.isExactActive;
    return ['p-panelmenu-header-action', {
      'router-link-active': isActive,
      'router-link-active-exact': instance.exact && isExactActive
    }];
  },
  headerIcon: 'p-menuitem-icon',
  headerLabel: 'p-menuitem-text',
  toggleableContent: 'p-toggleable-content',
  menuContent: 'p-panelmenu-content',
  menu: 'p-panelmenu-root-list',
  menuitem: function menuitem(_ref3) {
    var instance = _ref3.instance,
      processedItem = _ref3.processedItem;
    return ['p-menuitem', {
      'p-focus': instance.isItemFocused(processedItem),
      'p-disabled': instance.isItemDisabled(processedItem)
    }];
  },
  content: 'p-menuitem-content',
  action: function action(_ref4) {
    var props = _ref4.props,
      isActive = _ref4.isActive,
      isExactActive = _ref4.isExactActive;
    return ['p-menuitem-link', {
      'router-link-active': isActive,
      'router-link-active-exact': props.exact && isExactActive
    }];
  },
  icon: 'p-menuitem-icon',
  label: 'p-menuitem-text',
  submenuIcon: 'p-submenu-icon',
  submenu: 'p-submenu-list',
  separator: 'p-menuitem-separator'
};
var PanelMenuStyle = BaseStyle.extend({
  name: 'panelmenu',
  css: css,
  classes: classes
});

export { PanelMenuStyle as default };
