import BaseStyle from 'primevue/base/style';

var css = "\n@layer primevue {\n    .p-avatar-group .p-avatar + .p-avatar {\n        margin-left: -1rem;\n    }\n\n    .p-avatar-group {\n        display: flex;\n        align-items: center;\n    }\n}\n";
var classes = {
  root: 'p-avatar-group p-component'
};
var AvatarGroupStyle = BaseStyle.extend({
  name: 'avatargroup',
  css: css,
  classes: classes
});

export { AvatarGroupStyle as default };
