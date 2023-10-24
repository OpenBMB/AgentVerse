this.primevue = this.primevue || {};
this.primevue.knob = this.primevue.knob || {};
this.primevue.knob.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var css = "\n@keyframes dash-frame {\n    100% {\n        stroke-dashoffset: 0;\n    }\n}\n@layer primevue {\n    .p-knob-range {\n        fill: none;\n        transition: stroke 0.1s ease-in;\n    }\n    .p-knob-value {\n        animation-name: dash-frame;\n        animation-fill-mode: forwards;\n        fill: none;\n    }\n    .p-knob-text {\n        font-size: 1.3rem;\n        text-align: center;\n    }\n}\n";
    var classes = {
      root: function root(_ref) {
        var props = _ref.props;
        return ['p-knob p-component', {
          'p-disabled': props.disabled
        }];
      },
      range: 'p-knob-range',
      value: 'p-knob-value',
      label: 'p-knob-text'
    };
    var KnobStyle = BaseStyle__default["default"].extend({
      name: 'knob',
      css: css,
      classes: classes
    });

    return KnobStyle;

})(primevue.base.style);
