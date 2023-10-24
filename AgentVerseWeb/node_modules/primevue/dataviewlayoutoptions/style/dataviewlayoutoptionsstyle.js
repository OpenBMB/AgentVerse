this.primevue = this.primevue || {};
this.primevue.dataviewlayoutoptions = this.primevue.dataviewlayoutoptions || {};
this.primevue.dataviewlayoutoptions.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

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
    var DataViewLayoutOptionsStyle = BaseStyle__default["default"].extend({
      name: 'dataviewlayoutoptions',
      classes: classes
    });

    return DataViewLayoutOptionsStyle;

})(primevue.base.style);
