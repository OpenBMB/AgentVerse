this.primevue = this.primevue || {};
this.primevue.chip = this.primevue.chip || {};
this.primevue.chip.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var css = "\n@layer primevue {\n    .p-chip {\n        display: inline-flex;\n        align-items: center;\n    }\n\n    .p-chip-text {\n        line-height: 1.5;\n    }\n\n    .p-chip-icon.pi {\n        line-height: 1.5;\n    }\n\n    .p-chip-remove-icon {\n        line-height: 1.5;\n        cursor: pointer;\n    }\n\n    .p-chip img {\n        border-radius: 50%;\n    }\n}\n";
    var classes = {
      root: function root(_ref) {
        var props = _ref.props;
        return ['p-chip p-component', {
          'p-chip-image': props.image != null
        }];
      },
      icon: 'p-chip-icon',
      label: 'p-chip-text',
      removeIcon: 'p-chip-remove-icon'
    };
    var ChipStyle = BaseStyle__default["default"].extend({
      name: 'chip',
      css: css,
      classes: classes
    });

    return ChipStyle;

})(primevue.base.style);
