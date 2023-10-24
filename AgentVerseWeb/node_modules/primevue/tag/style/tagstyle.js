this.primevue = this.primevue || {};
this.primevue.tag = this.primevue.tag || {};
this.primevue.tag.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var css = "\n@layer primevue {\n    .p-tag {\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n    }\n\n    .p-tag-icon,\n    .p-tag-value,\n    .p-tag-icon.pi {\n        line-height: 1.5;\n    }\n\n    .p-tag.p-tag-rounded {\n        border-radius: 10rem;\n    }\n}\n";
    var classes = {
      root: function root(_ref) {
        var props = _ref.props;
        return ['p-tag p-component', {
          'p-tag-info': props.severity === 'info',
          'p-tag-success': props.severity === 'success',
          'p-tag-warning': props.severity === 'warning',
          'p-tag-danger': props.severity === 'danger',
          'p-tag-rounded': props.rounded
        }];
      },
      icon: 'p-tag-icon',
      value: 'p-tag-value'
    };
    var TagStyle = BaseStyle__default["default"].extend({
      name: 'tag',
      css: css,
      classes: classes
    });

    return TagStyle;

})(primevue.base.style);
