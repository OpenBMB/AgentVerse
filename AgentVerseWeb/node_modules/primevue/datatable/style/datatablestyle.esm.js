import BaseStyle from 'primevue/base/style';

var css = "\n@layer primevue {\n    .p-datatable {\n        position: relative;\n    }\n\n    .p-datatable-table {\n        border-spacing: 0px;\n        width: 100%;\n    }\n\n    .p-datatable .p-sortable-column {\n        cursor: pointer;\n        user-select: none;\n    }\n\n    .p-datatable .p-sortable-column .p-column-title,\n    .p-datatable .p-sortable-column .p-sortable-column-icon,\n    .p-datatable .p-sortable-column .p-sortable-column-badge {\n        vertical-align: middle;\n    }\n\n    .p-datatable .p-sortable-column .p-sortable-column-badge {\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n    }\n\n    .p-datatable-hoverable-rows .p-selectable-row {\n        cursor: pointer;\n    }\n\n    /* Scrollable */\n    .p-datatable-scrollable > .p-datatable-wrapper {\n        position: relative;\n    }\n\n    .p-datatable-scrollable-table > .p-datatable-thead {\n        top: 0;\n        z-index: 1;\n    }\n\n    .p-datatable-scrollable-table > .p-datatable-frozen-tbody {\n        position: sticky;\n        z-index: 1;\n    }\n\n    .p-datatable-scrollable-table > .p-datatable-tfoot {\n        bottom: 0;\n        z-index: 1;\n    }\n\n    .p-datatable-scrollable .p-frozen-column {\n        position: sticky;\n        background: inherit;\n    }\n\n    .p-datatable-scrollable th.p-frozen-column {\n        z-index: 1;\n    }\n\n    .p-datatable-flex-scrollable {\n        display: flex;\n        flex-direction: column;\n        height: 100%;\n    }\n\n    .p-datatable-flex-scrollable > .p-datatable-wrapper {\n        display: flex;\n        flex-direction: column;\n        flex: 1;\n        height: 100%;\n    }\n\n    .p-datatable-scrollable-table > .p-datatable-tbody > .p-rowgroup-header {\n        position: sticky;\n        z-index: 1;\n    }\n\n    /* Resizable */\n    .p-datatable-resizable-table > .p-datatable-thead > tr > th,\n    .p-datatable-resizable-table > .p-datatable-tfoot > tr > td,\n    .p-datatable-resizable-table > .p-datatable-tbody > tr > td {\n        overflow: hidden;\n        white-space: nowrap;\n    }\n\n    .p-datatable-resizable-table > .p-datatable-thead > tr > th.p-resizable-column:not(.p-frozen-column) {\n        background-clip: padding-box;\n        position: relative;\n    }\n\n    .p-datatable-resizable-table-fit > .p-datatable-thead > tr > th.p-resizable-column:last-child .p-column-resizer {\n        display: none;\n    }\n\n    .p-datatable .p-column-resizer {\n        display: block;\n        position: absolute !important;\n        top: 0;\n        right: 0;\n        margin: 0;\n        width: 0.5rem;\n        height: 100%;\n        padding: 0px;\n        cursor: col-resize;\n        border: 1px solid transparent;\n    }\n\n    .p-datatable .p-column-header-content {\n        display: flex;\n        align-items: center;\n    }\n\n    .p-datatable .p-column-resizer-helper {\n        width: 1px;\n        position: absolute;\n        z-index: 10;\n        display: none;\n    }\n\n    .p-datatable .p-row-editor-init,\n    .p-datatable .p-row-editor-save,\n    .p-datatable .p-row-editor-cancel {\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        overflow: hidden;\n        position: relative;\n    }\n\n    /* Expand */\n    .p-datatable .p-row-toggler {\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        overflow: hidden;\n        position: relative;\n    }\n\n    /* Reorder */\n    .p-datatable-reorder-indicator-up,\n    .p-datatable-reorder-indicator-down {\n        position: absolute;\n        display: none;\n    }\n\n    .p-reorderable-column,\n    .p-datatable-reorderablerow-handle {\n        cursor: move;\n    }\n\n    /* Loader */\n    .p-datatable .p-datatable-loading-overlay {\n        position: absolute;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        z-index: 2;\n    }\n\n    /* Filter */\n    .p-column-filter-row {\n        display: flex;\n        align-items: center;\n        width: 100%;\n    }\n\n    .p-column-filter-menu {\n        display: inline-flex;\n        margin-left: auto;\n    }\n\n    .p-column-filter-row .p-column-filter-element {\n        flex: 1 1 auto;\n        width: 1%;\n    }\n\n    .p-column-filter-menu-button,\n    .p-column-filter-clear-button {\n        display: inline-flex;\n        justify-content: center;\n        align-items: center;\n        cursor: pointer;\n        text-decoration: none;\n        overflow: hidden;\n        position: relative;\n    }\n\n    .p-column-filter-row-items {\n        margin: 0;\n        padding: 0;\n        list-style: none;\n    }\n\n    .p-column-filter-row-item {\n        cursor: pointer;\n    }\n\n    .p-column-filter-add-button,\n    .p-column-filter-remove-button {\n        justify-content: center;\n    }\n\n    .p-column-filter-add-button .p-button-label,\n    .p-column-filter-remove-button .p-button-label {\n        flex-grow: 0;\n    }\n\n    .p-column-filter-buttonbar {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n    }\n\n    .p-column-filter-buttonbar .p-button:not(.p-button-icon-only) {\n        width: auto;\n    }\n\n    /* Responsive */\n    .p-datatable .p-datatable-tbody > tr > td > .p-column-title {\n        display: none;\n    }\n\n    /* VirtualScroller */\n    .p-datatable-virtualscroller-spacer {\n        display: flex;\n    }\n\n    .p-datatable .p-virtualscroller .p-virtualscroller-loading {\n        transform: none !important;\n        min-height: 0;\n        position: sticky;\n        top: 0;\n        left: 0;\n    }\n}\n";
var classes = {
  root: function root(_ref) {
    var instance = _ref.instance,
      props = _ref.props;
    return ['p-datatable p-component', {
      'p-datatable-hoverable-rows': props.rowHover || props.selectionMode,
      'p-datatable-resizable': props.resizableColumns,
      'p-datatable-resizable-fit': props.resizableColumns && props.columnResizeMode === 'fit',
      'p-datatable-scrollable': props.scrollable,
      'p-datatable-flex-scrollable': props.scrollable && props.scrollHeight === 'flex',
      'p-datatable-responsive-stack': props.responsiveLayout === 'stack',
      'p-datatable-responsive-scroll': props.responsiveLayout === 'scroll',
      'p-datatable-striped': props.stripedRows,
      'p-datatable-gridlines': props.showGridlines,
      'p-datatable-grouped-header': instance.headerColumnGroup != null,
      'p-datatable-grouped-footer': instance.footerColumnGroup != null,
      'p-datatable-sm': props.size === 'small',
      'p-datatable-lg': props.size === 'large'
    }];
  },
  loadingOverlay: 'p-datatable-loading-overlay p-component-overlay',
  loadingIcon: 'p-datatable-loading-icon',
  header: 'p-datatable-header',
  paginator: function paginator(_ref2) {
    var instance = _ref2.instance;
    return instance.paginatorTop ? 'p-paginator-top' : instance.paginatorBottom ? 'p-paginator-bottom' : '';
  },
  wrapper: 'p-datatable-wrapper',
  table: function table(_ref3) {
    var props = _ref3.props;
    return ['p-datatable-table', {
      'p-datatable-scrollable-table': props.scrollable,
      'p-datatable-resizable-table': props.resizableColumns,
      'p-datatable-resizable-table-fit': props.resizableColumns && props.columnResizeMode === 'fit'
    }];
  },
  //tablehead
  thead: 'p-datatable-thead',
  // headercell
  headerCell: function headerCell(_ref4) {
    var instance = _ref4.instance,
      props = _ref4.props,
      column = _ref4.column;
    return column && !instance.columnProp(column, 'hidden') && (props.rowGroupMode !== 'subheader' || props.groupRowsBy !== instance.columnProp(column, 'field')) ? ['p-filter-column', {
      'p-frozen-column': instance.columnProp(column, 'frozen')
    }] : [{
      'p-sortable-column': instance.columnProp('sortable'),
      'p-resizable-column': instance.resizableColumns,
      'p-highlight': instance.isColumnSorted(),
      'p-filter-column': props.filterColumn,
      'p-frozen-column': instance.columnProp('frozen'),
      'p-reorderable-column': props.reorderableColumns
    }];
  },
  columnResizer: 'p-column-resizer',
  headerContent: 'p-column-header-content',
  headerTitle: 'p-column-title',
  sortIcon: 'p-sortable-column-icon',
  sortBadge: 'p-sortable-column-badge',
  //headercheckbox
  headerCheckboxWrapper: function headerCheckboxWrapper(_ref5) {
    var instance = _ref5.instance;
    return ['p-checkbox p-component', {
      'p-checkbox-focused': instance.focused,
      'p-disabled': instance.disabled
    }];
  },
  headerCheckbox: function headerCheckbox(_ref6) {
    var instance = _ref6.instance;
    return ['p-checkbox-box p-component', {
      'p-highlight': instance.checked,
      'p-disabled': instance.disabled,
      'p-focus': instance.focused
    }];
  },
  headerCheckboxIcon: 'p-checkbox-icon',
  // columnfilter
  columnFilter: function columnFilter(_ref7) {
    var props = _ref7.props;
    return ['p-column-filter p-fluid', {
      'p-column-filter-row': props.display === 'row',
      'p-column-filter-menu': props.display === 'menu'
    }];
  },
  filterInput: 'p-fluid p-column-filter-element',
  filterMenuButton: function filterMenuButton(_ref8) {
    var instance = _ref8.instance;
    return ['p-column-filter-menu-button p-link', {
      'p-column-filter-menu-button-open': instance.overlayVisible,
      'p-column-filter-menu-button-active': instance.hasFilter()
    }];
  },
  headerFilterClearButton: function headerFilterClearButton(_ref9) {
    var instance = _ref9.instance;
    return ['p-column-filter-clear-button p-link', {
      'p-hidden-space': !instance.hasRowFilter()
    }];
  },
  filterOverlay: function filterOverlay(_ref10) {
    var instance = _ref10.instance,
      props = _ref10.props;
    return [{
      'p-column-filter-overlay p-component p-fluid': true,
      'p-column-filter-overlay-menu': props.display === 'menu',
      'p-input-filled': instance.$primevue.config.inputStyle === 'filled',
      'p-ripple-disabled': instance.$primevue.config.ripple === false
    }];
  },
  filterRowItems: 'p-column-filter-row-items',
  filterRowItem: function filterRowItem(_ref11) {
    var instance = _ref11.instance,
      matchMode = _ref11.matchMode;
    return ['p-column-filter-row-item', {
      'p-highlight': matchMode && instance.isRowMatchModeSelected(matchMode.value)
    }];
  },
  filterSeparator: 'p-column-filter-separator',
  filterOperator: 'p-column-filter-operator',
  filterOperatorDropdown: 'p-column-filter-operator-dropdown',
  filterConstraints: 'p-column-filter-constraints',
  filterConstraint: 'p-column-filter-constraint',
  filterMatchModeDropdown: 'p-column-filter-matchmode-dropdown',
  filterRemoveButton: 'p-column-filter-remove-button p-button-text p-button-danger p-button-sm',
  filterAddRule: 'p-column-filter-add-rule',
  filterAddRuleButton: 'p-column-filter-add-button p-button-text p-button-sm',
  filterButtonbar: 'p-column-filter-buttonbar',
  filterClearButton: 'p-button-outlined p-button-sm',
  filterApplyButton: 'p-button-sm',
  //tablebody
  tbody: function tbody(_ref12) {
    var props = _ref12.props;
    return props.frozenRow ? 'p-datatable-tbody p-datatable-frozen-tbody' : 'p-datatable-tbody';
  },
  rowgroupHeader: 'p-rowgroup-header',
  rowGroupToggler: 'p-row-toggler p-link',
  rowGroupTogglerIcon: 'p-row-toggler-icon',
  row: function row(_ref13) {
    var instance = _ref13.instance,
      props = _ref13.props,
      rowData = _ref13.rowData;
    var rowStyleClass = [];
    if (props.selectionMode) {
      rowStyleClass.push('p-selectable-row');
    }
    if (props.selection) {
      rowStyleClass.push({
        'p-highlight': instance.isSelected(rowData)
      });
    }
    if (props.contextMenuSelection) {
      rowStyleClass.push({
        'p-highlight-contextmenu': instance.isSelectedWithContextMenu(rowData)
      });
    }
    return rowStyleClass;
  },
  rowExpansion: 'p-datatable-row-expansion',
  rowgroupFooter: 'p-rowgroup-footer',
  emptyMessage: 'p-datatable-emptymessage',
  //bodycell
  bodyCell: function bodyCell(_ref14) {
    var instance = _ref14.instance;
    return [{
      'p-selection-column': instance.columnProp('selectionMode') != null,
      'p-editable-column': instance.isEditable(),
      'p-cell-editing': instance.d_editing,
      'p-frozen-column': instance.columnProp('frozen')
    }];
  },
  columnTitle: 'p-column-title',
  rowReorderIcon: 'p-datatable-reorderablerow-handle',
  rowToggler: 'p-row-toggler p-link',
  rowTogglerIcon: 'p-row-toggler-icon',
  rowEditorInitButton: 'p-row-editor-init p-link',
  rowEditorInitIcon: 'p-row-editor-init-icon',
  rowEditorSaveButton: 'p-row-editor-save p-link',
  rowEditorSaveIcon: 'p-row-editor-save-icon',
  rowEditorCancelButton: 'p-row-editor-cancel p-link',
  rowEditorCancelIcon: 'p-row-editor-cancel-icon',
  //rowcheckbox
  checkboxWrapper: function checkboxWrapper(_ref15) {
    var instance = _ref15.instance;
    return ['p-checkbox p-component', {
      'p-checkbox-focused': instance.focused
    }];
  },
  checkbox: function checkbox(_ref16) {
    var instance = _ref16.instance;
    return ['p-checkbox-box p-component', {
      'p-highlight': instance.checked,
      'p-disabled': instance.$attrs.disabled,
      'p-focus': instance.focused
    }];
  },
  checkboxIcon: 'p-checkbox-icon',
  //rowradiobutton
  radiobuttonWrapper: function radiobuttonWrapper(_ref17) {
    var instance = _ref17.instance;
    return ['p-radiobutton p-component', {
      'p-radiobutton-focused': instance.focused
    }];
  },
  radiobutton: function radiobutton(_ref18) {
    var instance = _ref18.instance;
    return ['p-radiobutton-box p-component', {
      'p-highlight': instance.checked,
      'p-disabled': instance.$attrs.disabled,
      'p-focus': instance.focused
    }];
  },
  radiobuttonIcon: 'p-radiobutton-icon',
  //tablefooter
  tfoot: 'p-datatable-tfoot',
  //footercell
  footerCell: function footerCell(_ref19) {
    var instance = _ref19.instance;
    return [{
      'p-frozen-column': instance.columnProp('frozen')
    }];
  },
  //datatable
  virtualScrollerSpacer: 'p-datatable-virtualscroller-spacer',
  footer: 'p-datatable-footer',
  resizeHelper: 'p-column-resizer-helper',
  reorderIndicatorUp: 'p-datatable-reorder-indicator-up',
  reorderIndicatorDown: 'p-datatable-reorder-indicator-down'
};
var inlineStyles = {
  wrapper: {
    overflow: 'auto'
  },
  thead: {
    position: 'sticky'
  },
  tfoot: {
    position: 'sticky'
  }
};
var DataTableStyle = BaseStyle.extend({
  name: 'datatable',
  css: css,
  classes: classes,
  inlineStyles: inlineStyles
});

export { DataTableStyle as default };
