'use strict';

var BaseStyle = require('primevue/base/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var css = "\n@layer primevue {\n    .p-speeddial {\n        position: absolute;\n        display: flex;\n    }\n\n    .p-speeddial-button {\n        z-index: 1;\n    }\n\n    .p-speeddial-list {\n        margin: 0;\n        padding: 0;\n        list-style: none;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        transition: top 0s linear 0.2s;\n        pointer-events: none;\n        z-index: 2;\n    }\n\n    .p-speeddial-item {\n        transform: scale(0);\n        opacity: 0;\n        transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, opacity 0.8s;\n        will-change: transform;\n    }\n\n    .p-speeddial-action {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        border-radius: 50%;\n        position: relative;\n        overflow: hidden;\n    }\n\n    .p-speeddial-circle .p-speeddial-item,\n    .p-speeddial-semi-circle .p-speeddial-item,\n    .p-speeddial-quarter-circle .p-speeddial-item {\n        position: absolute;\n    }\n\n    .p-speeddial-rotate {\n        transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;\n        will-change: transform;\n    }\n\n    .p-speeddial-mask {\n        position: absolute;\n        left: 0;\n        top: 0;\n        width: 100%;\n        height: 100%;\n        opacity: 0;\n        transition: opacity 250ms cubic-bezier(0.25, 0.8, 0.25, 1);\n    }\n\n    .p-speeddial-mask-visible {\n        pointer-events: none;\n        opacity: 1;\n        transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);\n    }\n\n    .p-speeddial-opened .p-speeddial-list {\n        pointer-events: auto;\n    }\n\n    .p-speeddial-opened .p-speeddial-item {\n        transform: scale(1);\n        opacity: 1;\n    }\n\n    .p-speeddial-opened .p-speeddial-rotate {\n        transform: rotate(45deg);\n    }\n}\n";

/* Direction */
var inlineStyles = {
  root: function root(_ref) {
    var props = _ref.props;
    return {
      alignItems: props.direction === 'up' || props.direction === 'down' ? 'center' : '',
      justifyContent: props.direction === 'left' || props.direction === 'right' ? 'center' : '',
      flexDirection: props.direction === 'up' ? 'column-reverse' : props.direction === 'down' ? 'column' : props.direction === 'left' ? 'row-reverse' : props.direction === 'right' ? 'row' : null
    };
  },
  menu: function menu(_ref2) {
    var props = _ref2.props;
    return {
      flexDirection: props.direction === 'up' ? 'column-reverse' : props.direction === 'down' ? 'column' : props.direction === 'left' ? 'row-reverse' : props.direction === 'right' ? 'row' : null
    };
  }
};
var classes = {
  root: function root(_ref3) {
    var _ref4;
    var instance = _ref3.instance,
      props = _ref3.props;
    return ["p-speeddial p-component p-speeddial-".concat(props.type), (_ref4 = {}, _defineProperty(_ref4, "p-speeddial-direction-".concat(props.direction), props.type !== 'circle'), _defineProperty(_ref4, 'p-speeddial-opened', instance.d_visible), _defineProperty(_ref4, 'p-disabled', props.disabled), _ref4)];
  },
  button: function button(_ref5) {
    var props = _ref5.props;
    return ['p-speeddial-button p-button-rounded', {
      'p-speeddial-rotate': props.rotateAnimation && !props.hideIcon
    }];
  },
  menu: 'p-speeddial-list',
  menuitem: function menuitem(_ref6) {
    var instance = _ref6.instance,
      id = _ref6.id;
    return ['p-speeddial-item', {
      'p-focus': instance.isItemActive(id)
    }];
  },
  action: function action(_ref7) {
    var item = _ref7.item;
    return ['p-speeddial-action', {
      'p-disabled': item.disabled
    }];
  },
  actionIcon: 'p-speeddial-action-icon',
  mask: function mask(_ref8) {
    var instance = _ref8.instance;
    return ['p-speeddial-mask', {
      'p-speeddial-mask-visible': instance.d_visible
    }];
  }
};
var SpeedDialStyle = BaseStyle__default["default"].extend({
  name: 'speeddial',
  css: css,
  classes: classes,
  inlineStyles: inlineStyles
});

module.exports = SpeedDialStyle;
