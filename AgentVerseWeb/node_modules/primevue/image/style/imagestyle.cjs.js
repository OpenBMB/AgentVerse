'use strict';

var BaseStyle = require('primevue/base/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

var css = "\n@layer primevue {\n    .p-image-mask {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n\n    .p-image-preview-container {\n        position: relative;\n        display: inline-block;\n        line-height: 0;\n    }\n\n    .p-image-preview-indicator {\n        position: absolute;\n        left: 0;\n        top: 0;\n        width: 100%;\n        height: 100%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        opacity: 0;\n        transition: opacity 0.3s;\n        border: none;\n        padding: 0;\n    }\n\n    .p-image-preview-container:hover > .p-image-preview-indicator {\n        opacity: 1;\n        cursor: pointer;\n    }\n\n    .p-image-preview-container > img {\n        cursor: pointer;\n    }\n\n    .p-image-toolbar {\n        position: absolute;\n        top: 0;\n        right: 0;\n        display: flex;\n    }\n\n    .p-image-action.p-link {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n    }\n\n    .p-image-preview {\n        transition: transform 0.15s;\n        max-width: 100vw;\n        max-height: 100vh;\n    }\n\n    .p-image-preview-enter-active {\n        transition: all 150ms cubic-bezier(0, 0, 0.2, 1);\n    }\n    .p-image-preview-leave-active {\n        transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);\n    }\n    .p-image-preview-enter-from,\n    .p-image-preview-leave-to {\n        opacity: 0;\n        transform: scale(0.7);\n    }\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-image p-component', {
      'p-image-preview-container': props.preview
    }];
  },
  image: function image(_ref2) {
    var props = _ref2.props;
    return props.image;
  },
  button: 'p-image-preview-indicator',
  icon: 'p-image-preview-icon',
  mask: 'p-image-mask p-component-overlay p-component-overlay-enter',
  toolbar: 'p-image-toolbar',
  rotateRightButton: 'p-image-action p-link',
  rotateLeftButton: 'p-image-action p-link',
  zoomOutButton: function zoomOutButton(_ref3) {
    var instance = _ref3.instance;
    return ['p-image-action p-link', {
      'p-disabled': instance.isZoomOutDisabled
    }];
  },
  zoomInButton: function zoomInButton(_ref4) {
    var instance = _ref4.instance;
    return ['p-image-action p-link', {
      'p-disabled': instance.isZoomInDisabled
    }];
  },
  closeButton: 'p-image-action p-link',
  preview: 'p-image-preview'
};
var ImageStyle = BaseStyle__default["default"].extend({
  name: 'image',
  css: css,
  classes: classes
});

module.exports = ImageStyle;
