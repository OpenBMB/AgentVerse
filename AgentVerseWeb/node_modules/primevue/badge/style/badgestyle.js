this.primevue = this.primevue || {};
this.primevue.badge = this.primevue.badge || {};
this.primevue.badge.style = (function (BaseStyle, utils) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var css = "\n@layer primevue {\n    .p-badge {\n        display: inline-block;\n        border-radius: 10px;\n        text-align: center;\n        padding: 0 .5rem;\n    }\n\n    .p-overlay-badge {\n        position: relative;\n    }\n\n    .p-overlay-badge .p-badge {\n        position: absolute;\n        top: 0;\n        right: 0;\n        transform: translate(50%,-50%);\n        transform-origin: 100% 0;\n        margin: 0;\n    }\n\n    .p-badge-dot {\n        width: .5rem;\n        min-width: .5rem;\n        height: .5rem;\n        border-radius: 50%;\n        padding: 0;\n    }\n\n    .p-badge-no-gutter {\n        padding: 0;\n        border-radius: 50%;\n    }\n}\n";
    var classes = {
      root: function root(_ref) {
        var props = _ref.props,
          instance = _ref.instance;
        return ['p-badge p-component', {
          'p-badge-no-gutter': utils.ObjectUtils.isNotEmpty(props.value) && String(props.value).length === 1,
          'p-badge-dot': utils.ObjectUtils.isEmpty(props.value) && !instance.$slots["default"],
          'p-badge-lg': props.size === 'large',
          'p-badge-xl': props.size === 'xlarge',
          'p-badge-info': props.severity === 'info',
          'p-badge-success': props.severity === 'success',
          'p-badge-warning': props.severity === 'warning',
          'p-badge-danger': props.severity === 'danger'
        }];
      }
    };
    var BadgeStyle = BaseStyle__default["default"].extend({
      name: 'badge',
      css: css,
      classes: classes
    });

    return BadgeStyle;

})(primevue.base.style, primevue.utils);
