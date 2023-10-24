this.primevue = this.primevue || {};
this.primevue.inlinemessage = this.primevue.inlinemessage || {};
this.primevue.inlinemessage.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var css = "\n@layer primevue {\n    .p-inline-message {\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        vertical-align: top;\n    }\n    \n    .p-inline-message-icon {\n        flex-shrink: 0;\n    }\n\n    .p-inline-message-icon-only .p-inline-message-text {\n        visibility: hidden;\n        width: 0;\n    }\n\n    .p-fluid .p-inline-message {\n        display: flex;\n    }\n}\n";
    var classes = {
      root: function root(_ref) {
        var props = _ref.props,
          instance = _ref.instance;
        return ['p-inline-message p-component p-inline-message-' + props.severity, {
          'p-inline-message-icon-only': !instance.$slots["default"]
        }];
      },
      icon: function icon(_ref2) {
        var props = _ref2.props;
        return ['p-inline-message-icon', props.icon];
      },
      text: 'p-inline-message-text'
    };
    var InlineMessageStyle = BaseStyle__default["default"].extend({
      name: 'inlinemessage',
      css: css,
      classes: classes
    });

    return InlineMessageStyle;

})(primevue.base.style);
