this.primevue = this.primevue || {};
this.primevue.dataview = this.primevue.dataview || {};
this.primevue.dataview.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: function root(_ref) {
        var props = _ref.props;
        return ['p-dataview p-component', {
          'p-dataview-list': props.layout === 'list',
          'p-dataview-grid': props.layout === 'grid'
        }];
      },
      header: 'p-dataview-header',
      paginator: function paginator(_ref2) {
        var instance = _ref2.instance;
        return instance.paginatorTop ? 'p-paginator-top' : instance.paginatorBottom ? 'p-paginator-bottom' : '';
      },
      content: 'p-dataview-content',
      grid: 'p-grid p-nogutter grid grid-nogutter',
      column: 'p-col col',
      emptyMessage: 'p-dataview-emptymessage',
      footer: 'p-dataview-footer'
    };
    var DataViewStyle = BaseStyle__default["default"].extend({
      name: 'dataview',
      classes: classes
    });

    return DataViewStyle;

})(primevue.base.style);
