'use strict';

var BaseStyle = require('primevue/base/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

var css = "\n@layer primevue {\n    .p-treetable {\n        position: relative;\n    }\n\n    .p-treetable table {\n        border-collapse: collapse;\n        width: 100%;\n        table-layout: fixed;\n    }\n\n    .p-treetable .p-sortable-column {\n        cursor: pointer;\n        user-select: none;\n    }\n\n    .p-treetable-responsive-scroll > .p-treetable-wrapper {\n        overflow-x: auto;\n    }\n\n    .p-treetable-responsive-scroll > .p-treetable-wrapper > table,\n    .p-treetable-auto-layout > .p-treetable-wrapper > table {\n        table-layout: auto;\n    }\n\n    .p-treetable-hoverable-rows .p-treetable-tbody > tr {\n        cursor: pointer;\n    }\n\n    .p-treetable-toggler {\n        cursor: pointer;\n        user-select: none;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        vertical-align: middle;\n        overflow: hidden;\n        position: relative;\n    }\n\n    .p-treetable-toggler + .p-checkbox {\n        vertical-align: middle;\n    }\n\n    .p-treetable-toggler + .p-checkbox + span {\n        vertical-align: middle;\n    }\n\n    /* Resizable */\n    .p-treetable-resizable > .p-treetable-wrapper {\n        overflow-x: auto;\n    }\n\n    .p-treetable-resizable .p-treetable-thead > tr > th,\n    .p-treetable-resizable .p-treetable-tfoot > tr > td,\n    .p-treetable-resizable .p-treetable-tbody > tr > td {\n        overflow: hidden;\n    }\n\n    .p-treetable-resizable .p-resizable-column:not(.p-frozen-column) {\n        background-clip: padding-box;\n        position: relative;\n    }\n\n    .p-treetable-resizable-fit .p-resizable-column:last-child .p-column-resizer {\n        display: none;\n    }\n\n    .p-treetable .p-column-resizer {\n        display: block;\n        position: absolute !important;\n        top: 0;\n        right: 0;\n        margin: 0;\n        width: 0.5rem;\n        height: 100%;\n        padding: 0px;\n        cursor: col-resize;\n        border: 1px solid transparent;\n    }\n\n    .p-treetable .p-column-resizer-helper {\n        width: 1px;\n        position: absolute;\n        z-index: 10;\n        display: none;\n    }\n\n    .p-treetable .p-treetable-loading-overlay {\n        position: absolute;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        z-index: 2;\n    }\n\n    /* Scrollable */\n    .p-treetable-scrollable .p-treetable-wrapper {\n        position: relative;\n        overflow: auto;\n    }\n\n    .p-treetable-scrollable .p-treetable-table {\n        display: block;\n    }\n\n    .p-treetable-scrollable .p-treetable-thead,\n    .p-treetable-scrollable .p-treetable-tbody,\n    .p-treetable-scrollable .p-treetable-tfoot {\n        display: block;\n    }\n\n    .p-treetable-scrollable .p-treetable-thead > tr,\n    .p-treetable-scrollable .p-treetable-tbody > tr,\n    .p-treetable-scrollable .p-treetable-tfoot > tr {\n        display: flex;\n        flex-wrap: nowrap;\n        width: 100%;\n    }\n\n    .p-treetable-scrollable .p-treetable-thead > tr > th,\n    .p-treetable-scrollable .p-treetable-tbody > tr > td,\n    .p-treetable-scrollable .p-treetable-tfoot > tr > td {\n        display: flex;\n        flex: 1 1 0;\n        align-items: center;\n    }\n\n    .p-treetable-scrollable .p-treetable-thead {\n        position: sticky;\n        top: 0;\n        z-index: 1;\n    }\n\n    .p-treetable-scrollable .p-treetable-tfoot {\n        position: sticky;\n        bottom: 0;\n        z-index: 1;\n    }\n\n    .p-treetable-scrollable .p-frozen-column {\n        position: sticky;\n        background: inherit;\n    }\n\n    .p-treetable-scrollable th.p-frozen-column {\n        z-index: 1;\n    }\n\n    .p-treetable-scrollable-both .p-treetable-thead > tr > th,\n    .p-treetable-scrollable-both .p-treetable-tbody > tr > td,\n    .p-treetable-scrollable-both .p-treetable-tfoot > tr > td,\n    .p-treetable-scrollable-horizontal .p-treetable-thead > tr > th .p-treetable-scrollable-horizontal .p-treetable-tbody > tr > td,\n    .p-treetable-scrollable-horizontal .p-treetable-tfoot > tr > td {\n        flex: 0 0 auto;\n    }\n\n    .p-treetable-flex-scrollable {\n        display: flex;\n        flex-direction: column;\n        height: 100%;\n    }\n\n    .p-treetable-flex-scrollable .p-treetable-wrapper {\n        display: flex;\n        flex-direction: column;\n        flex: 1;\n        height: 100%;\n    }\n}\n";
var classes = {
  root: function root(_ref) {
    var instance = _ref.instance,
      props = _ref.props;
    return ['p-treetable p-component', {
      'p-treetable-hoverable-rows': props.rowHover || instance.rowSelectionMode,
      'p-treetable-auto-layout': props.autoLayout,
      'p-treetable-resizable': props.resizableColumns,
      'p-treetable-resizable-fit': props.resizableColumns && props.columnResizeMode === 'fit',
      'p-treetable-gridlines': props.showGridlines,
      'p-treetable-scrollable': props.scrollable,
      'p-treetable-scrollable-vertical': props.scrollable && props.scrollDirection === 'vertical',
      'p-treetable-scrollable-horizontal': props.scrollable && props.scrollDirection === 'horizontal',
      'p-treetable-scrollable-both': props.scrollable && props.scrollDirection === 'both',
      'p-treetable-flex-scrollable': props.scrollable && props.scrollHeight === 'flex',
      'p-treetable-responsive-scroll': props.responsiveLayout === 'scroll',
      'p-treetable-sm': props.size === 'small',
      'p-treetable-lg': props.size === 'large'
    }];
  },
  loadingWrapper: 'p-treetable-loading',
  loadingOverlay: 'p-treetable-loading-overlay p-component-overlay',
  loadingIcon: 'p-treetable-loading-icon',
  header: 'p-treetable-header',
  paginator: function paginator(_ref2) {
    var instance = _ref2.instance;
    return instance.paginatorTop ? 'p-paginator-top' : instance.paginatorBottom ? 'p-paginator-bottom' : '';
  },
  wrapper: 'p-treetable-wrapper',
  thead: 'p-treetable-thead',
  //headercell
  headerCell: function headerCell(_ref3) {
    var instance = _ref3.instance,
      props = _ref3.props,
      column = _ref3.column;
    return column && instance.hasColumnFilter() ? ['p-filter-column', {
      'p-frozen-column': instance.columnProp(column, 'frozen')
    }] : [{
      'p-sortable-column': instance.columnProp('sortable'),
      'p-resizable-column': props.resizableColumns,
      'p-highlight': instance.isColumnSorted(),
      'p-frozen-column': instance.columnProp('frozen')
    }];
  },
  columnResizer: 'p-column-resizer',
  headerTitle: 'p-column-title',
  sortIcon: 'p-sortable-column-icon',
  sortBadge: 'p-sortable-column-badge',
  tbody: 'p-treetable-tbody',
  //ttrow
  row: function row(_ref4) {
    var instance = _ref4.instance;
    return [{
      'p-highlight': instance.selected
    }];
  },
  //bodycell
  bodyCell: function bodyCell(_ref5) {
    var instance = _ref5.instance;
    return [{
      'p-frozen-column': instance.columnProp('frozen')
    }];
  },
  rowToggler: 'p-treetable-toggler p-link',
  rowTogglerIcon: 'p-tree-toggler-icon',
  checkboxWrapper: function checkboxWrapper(_ref6) {
    var instance = _ref6.instance;
    return ['p-checkbox p-treetable-checkbox p-component', {
      'p-checkbox-focused': instance.checkboxFocused
    }];
  },
  checkbox: function checkbox(_ref7) {
    var instance = _ref7.instance;
    return ['p-checkbox-box', {
      'p-highlight': instance.checked,
      'p-focus': instance.checkboxFocused,
      'p-indeterminate': instance.partialChecked
    }];
  },
  checkboxicon: 'p-checkbox-icon',
  //treetable
  emptyMessage: 'p-treetable-emptymessage',
  tfoot: 'p-treetable-tfoot',
  //footercell
  footerCell: function footerCell(_ref8) {
    var instance = _ref8.instance;
    return [{
      'p-frozen-column': instance.columnProp('frozen')
    }];
  },
  //treetable
  footer: 'p-treetable-footer',
  resizeHelper: 'p-column-resizer-helper p-highlight'
};
var TreeTableStyle = BaseStyle__default["default"].extend({
  name: 'treetable',
  css: css,
  classes: classes
});

module.exports = TreeTableStyle;
