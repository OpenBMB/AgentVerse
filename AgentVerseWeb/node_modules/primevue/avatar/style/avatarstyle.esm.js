import BaseStyle from 'primevue/base/style';

var css = "\n@layer primevue {\n    .p-avatar {\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        width: 2rem;\n        height: 2rem;\n        font-size: 1rem;\n    }\n\n    .p-avatar.p-avatar-image {\n        background-color: transparent;\n    }\n\n    .p-avatar.p-avatar-circle {\n        border-radius: 50%;\n    }\n\n    .p-avatar-circle img {\n        border-radius: 50%;\n    }\n\n    .p-avatar .p-avatar-icon {\n        font-size: 1rem;\n    }\n\n    .p-avatar img {\n        width: 100%;\n        height: 100%;\n    }\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-avatar p-component', {
      'p-avatar-image': props.image != null,
      'p-avatar-circle': props.shape === 'circle',
      'p-avatar-lg': props.size === 'large',
      'p-avatar-xl': props.size === 'xlarge'
    }];
  },
  label: 'p-avatar-text',
  icon: 'p-avatar-icon'
};
var AvatarStyle = BaseStyle.extend({
  name: 'avatar',
  css: css,
  classes: classes
});

export { AvatarStyle as default };
