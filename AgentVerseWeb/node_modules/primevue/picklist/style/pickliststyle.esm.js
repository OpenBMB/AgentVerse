import BaseStyle from 'primevue/base/style';

var css = "\n@layer primevue {\n    .p-picklist {\n        display: flex;\n    }\n\n    .p-picklist-buttons {\n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n    }\n\n    .p-picklist-list-wrapper {\n        flex: 1 1 50%;\n    }\n\n    .p-picklist-list {\n        list-style-type: none;\n        margin: 0;\n        padding: 0;\n        overflow: auto;\n        min-height: 12rem;\n        max-height: 24rem;\n    }\n\n    .p-picklist-item {\n        cursor: pointer;\n        overflow: hidden;\n        position: relative;\n    }\n\n    .p-picklist-item.p-picklist-flip-enter-active.p-picklist-flip-enter-to,\n    .p-picklist-item.p-picklist-flip-leave-active.p-picklist-flip-leave-to {\n        transition: none !important;\n    }\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-picklist p-component', {
      'p-picklist-striped': props.stripedRows
    }];
  },
  sourceControls: 'p-picklist-buttons p-picklist-source-controls',
  sourceWrapper: 'p-picklist-list-wrapper p-picklist-source-wrapper',
  sourceHeader: 'p-picklist-header',
  sourceList: 'p-picklist-list p-picklist-source-list',
  buttons: 'p-picklist-buttons p-picklist-transfer-buttons',
  targetWrapper: 'p-picklist-list-wrapper p-picklist-target-wrapper',
  targetHeader: 'p-picklist-header',
  targetList: 'p-picklist-list p-picklist-target',
  item: function item(_ref2) {
    var instance = _ref2.instance,
      _item = _ref2.item,
      id = _ref2.id,
      listIndex = _ref2.listIndex;
    return ['p-picklist-item', {
      'p-highlight': instance.isSelected(_item, listIndex),
      'p-focus': id === instance.focusedOptionId
    }];
  },
  targetControls: 'p-picklist-buttons p-picklist-target-controls'
};
var PickListStyle = BaseStyle.extend({
  name: 'picklist',
  css: css,
  classes: classes
});

export { PickListStyle as default };
