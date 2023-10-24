this.primevue = this.primevue || {};
this.primevue.confirmdialog = this.primevue.confirmdialog || {};
this.primevue.confirmdialog.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: 'p-confirm-dialog',
      icon: function icon(_ref) {
        var instance = _ref.instance;
        return ['p-confirm-dialog-icon', instance.confirmation ? instance.confirmation.icon : null];
      },
      message: 'p-confirm-dialog-message',
      rejectButton: function rejectButton(_ref2) {
        var instance = _ref2.instance;
        return ['p-confirm-dialog-reject', instance.confirmation && !instance.confirmation.rejectClass ? 'p-button-text' : null];
      },
      acceptButton: 'p-confirm-dialog-accept'
    };
    var ConfirmDialogStyle = BaseStyle__default["default"].extend({
      name: 'confirmdialog',
      classes: classes
    });

    return ConfirmDialogStyle;

})(primevue.base.style);
