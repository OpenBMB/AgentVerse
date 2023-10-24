'use strict';

var BaseStyle = require('primevue/base/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

var classes = {
  root: function root(_ref) {
    var instance = _ref.instance;
    return ['p-inputmask p-inputtext p-component', {
      'p-filled': instance.filled
    }];
  }
};
var InputMaskStyle = BaseStyle__default["default"].extend({
  name: 'inputmask',
  classes: classes
});

module.exports = InputMaskStyle;
