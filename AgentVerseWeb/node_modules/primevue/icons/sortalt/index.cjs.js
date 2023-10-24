'use strict';

var BaseIcon = require('primevue/baseicon');
var utils = require('primevue/utils');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseIcon__default = /*#__PURE__*/_interopDefaultLegacy(BaseIcon);

var script = {
  name: 'SortAltIcon',
  "extends": BaseIcon__default["default"],
  computed: {
    pathId: function pathId() {
      return "pv_icon_clip_".concat(utils.UniqueComponentId());
    }
  }
};

var _hoisted_1 = ["clipPath"];
var _hoisted_2 = /*#__PURE__*/vue.createElementVNode("path", {
  d: "M5.64515 3.61291C5.47353 3.61291 5.30192 3.54968 5.16644 3.4142L3.38708 1.63484L1.60773 3.4142C1.34579 3.67613 0.912244 3.67613 0.650309 3.4142C0.388374 3.15226 0.388374 2.71871 0.650309 2.45678L2.90837 0.198712C3.17031 -0.0632236 3.60386 -0.0632236 3.86579 0.198712L6.12386 2.45678C6.38579 2.71871 6.38579 3.15226 6.12386 3.4142C5.98837 3.54968 5.81676 3.61291 5.64515 3.61291Z",
  fill: "currentColor"
}, null, -1);
var _hoisted_3 = /*#__PURE__*/vue.createElementVNode("path", {
  d: "M3.38714 14C3.01681 14 2.70972 13.6929 2.70972 13.3226V0.677419C2.70972 0.307097 3.01681 0 3.38714 0C3.75746 0 4.06456 0.307097 4.06456 0.677419V13.3226C4.06456 13.6929 3.75746 14 3.38714 14Z",
  fill: "currentColor"
}, null, -1);
var _hoisted_4 = /*#__PURE__*/vue.createElementVNode("path", {
  d: "M10.6129 14C10.4413 14 10.2697 13.9368 10.1342 13.8013L7.87611 11.5432C7.61418 11.2813 7.61418 10.8477 7.87611 10.5858C8.13805 10.3239 8.5716 10.3239 8.83353 10.5858L10.6129 12.3652L12.3922 10.5858C12.6542 10.3239 13.0877 10.3239 13.3497 10.5858C13.6116 10.8477 13.6116 11.2813 13.3497 11.5432L11.0916 13.8013C10.9561 13.9368 10.7845 14 10.6129 14Z",
  fill: "currentColor"
}, null, -1);
var _hoisted_5 = /*#__PURE__*/vue.createElementVNode("path", {
  d: "M10.6129 14C10.2426 14 9.93552 13.6929 9.93552 13.3226V0.677419C9.93552 0.307097 10.2426 0 10.6129 0C10.9833 0 11.2904 0.307097 11.2904 0.677419V13.3226C11.2904 13.6929 10.9832 14 10.6129 14Z",
  fill: "currentColor"
}, null, -1);
var _hoisted_6 = [_hoisted_2, _hoisted_3, _hoisted_4, _hoisted_5];
var _hoisted_7 = ["id"];
var _hoisted_8 = /*#__PURE__*/vue.createElementVNode("rect", {
  width: "14",
  height: "14",
  fill: "white"
}, null, -1);
var _hoisted_9 = [_hoisted_8];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("svg", vue.mergeProps({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _ctx.pti()), [vue.createElementVNode("g", {
    clipPath: "url(#".concat($options.pathId, ")")
  }, _hoisted_6, 8, _hoisted_1), vue.createElementVNode("defs", null, [vue.createElementVNode("clipPath", {
    id: "".concat($options.pathId)
  }, _hoisted_9, 8, _hoisted_7)])], 16);
}

script.render = render;

module.exports = script;
