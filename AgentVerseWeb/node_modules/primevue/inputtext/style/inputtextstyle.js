this.primevue = this.primevue || {};
this.primevue.inputtext = this.primevue.inputtext || {};
this.primevue.inputtext.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: function root(_ref) {
        var instance = _ref.instance,
          props = _ref.props;
        return ['p-inputtext p-component', {
          'p-filled': instance.filled,
          'p-inputtext-sm': props.size === 'small',
          'p-inputtext-lg': props.size === 'large'
        }];
      }
    };
    var InputTextStyle = BaseStyle__default["default"].extend({
      name: 'inputtext',
      classes: classes
    });

    return InputTextStyle;

})(primevue.base.style);
