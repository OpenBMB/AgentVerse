import BaseStyle from 'primevue/base/style';

var classes = {
  root: 'p-dataview-layout-options p-selectbutton p-buttonset',
  listButton: function listButton(_ref) {
    var props = _ref.props;
    return ['p-button p-button-icon-only', {
      'p-highlight': props.modelValue === 'list'
    }];
  },
  gridButton: function gridButton(_ref2) {
    var props = _ref2.props;
    return ['p-button p-button-icon-only', {
      'p-highlight': props.modelValue === 'grid'
    }];
  }
};
var DataViewLayoutOptionsStyle = BaseStyle.extend({
  name: 'dataviewlayoutoptions',
  classes: classes
});

export { DataViewLayoutOptionsStyle as default };
