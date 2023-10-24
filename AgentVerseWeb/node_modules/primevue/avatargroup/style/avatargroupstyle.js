this.primevue = this.primevue || {};
this.primevue.avatargroup = this.primevue.avatargroup || {};
this.primevue.avatargroup.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var css = "\n@layer primevue {\n    .p-avatar-group .p-avatar + .p-avatar {\n        margin-left: -1rem;\n    }\n\n    .p-avatar-group {\n        display: flex;\n        align-items: center;\n    }\n}\n";
    var classes = {
      root: 'p-avatar-group p-component'
    };
    var AvatarGroupStyle = BaseStyle__default["default"].extend({
      name: 'avatargroup',
      css: css,
      classes: classes
    });

    return AvatarGroupStyle;

})(primevue.base.style);
