this.primevue = this.primevue || {};
this.primevue.orderlist = this.primevue.orderlist || {};
this.primevue.orderlist.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var css = "\n@layer primevue {\n    .p-orderlist {\n        display: flex;\n    }\n\n    .p-orderlist-controls {\n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n    }\n\n    .p-orderlist-list-container {\n        flex: 1 1 auto;\n    }\n\n    .p-orderlist-list {\n        list-style-type: none;\n        margin: 0;\n        padding: 0;\n        overflow: auto;\n        min-height: 12rem;\n        max-height: 24rem;\n    }\n\n    .p-orderlist-item {\n        cursor: pointer;\n        overflow: hidden;\n        position: relative;\n    }\n\n    .p-orderlist.p-state-disabled .p-orderlist-item,\n    .p-orderlist.p-state-disabled .p-button {\n        cursor: default;\n    }\n\n    .p-orderlist.p-state-disabled .p-orderlist-list {\n        overflow: hidden;\n    }\n}\n";
    var classes = {
      root: function root(_ref) {
        var props = _ref.props;
        return ['p-orderlist p-component', {
          'p-orderlist-striped': props.stripedRows
        }];
      },
      controls: 'p-orderlist-controls',
      header: 'p-orderlist-header',
      container: 'p-orderlist-list-container',
      list: 'p-orderlist-list',
      item: function item(_ref2) {
        var instance = _ref2.instance,
          _item = _ref2.item,
          id = _ref2.id;
        return ['p-orderlist-item', {
          'p-highlight': instance.isSelected(_item),
          'p-focus': id === instance.focusedOptionId
        }];
      }
    };
    var OrderListStyle = BaseStyle__default["default"].extend({
      name: 'orderlist',
      css: css,
      classes: classes
    });

    return OrderListStyle;

})(primevue.base.style);
