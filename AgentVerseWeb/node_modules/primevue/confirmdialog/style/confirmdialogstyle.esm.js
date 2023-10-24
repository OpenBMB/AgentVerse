import BaseStyle from 'primevue/base/style';

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
var ConfirmDialogStyle = BaseStyle.extend({
  name: 'confirmdialog',
  classes: classes
});

export { ConfirmDialogStyle as default };
