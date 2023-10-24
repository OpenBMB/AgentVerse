this.primevue = this.primevue || {};
this.primevue.icons = this.primevue.icons || {};
this.primevue.icons.plus = (function (BaseIcon, utils, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseIcon__default = /*#__PURE__*/_interopDefaultLegacy(BaseIcon);

    var script = {
      name: 'PlusIcon',
      "extends": BaseIcon__default["default"],
      computed: {
        pathId: function pathId() {
          return "pv_icon_clip_".concat(utils.UniqueComponentId());
        }
      }
    };

    var _hoisted_1 = ["clipPath"];
    var _hoisted_2 = /*#__PURE__*/vue.createElementVNode("path", {
      d: "M7.67742 6.32258V0.677419C7.67742 0.497757 7.60605 0.325452 7.47901 0.198411C7.35197 0.0713707 7.17966 0 7 0C6.82034 0 6.64803 0.0713707 6.52099 0.198411C6.39395 0.325452 6.32258 0.497757 6.32258 0.677419V6.32258H0.677419C0.497757 6.32258 0.325452 6.39395 0.198411 6.52099C0.0713707 6.64803 0 6.82034 0 7C0 7.17966 0.0713707 7.35197 0.198411 7.47901C0.325452 7.60605 0.497757 7.67742 0.677419 7.67742H6.32258V13.3226C6.32492 13.5015 6.39704 13.6725 6.52358 13.799C6.65012 13.9255 6.82106 13.9977 7 14C7.17966 14 7.35197 13.9286 7.47901 13.8016C7.60605 13.6745 7.67742 13.5022 7.67742 13.3226V7.67742H13.3226C13.5022 7.67742 13.6745 7.60605 13.8016 7.47901C13.9286 7.35197 14 7.17966 14 7C13.9977 6.82106 13.9255 6.65012 13.799 6.52358C13.6725 6.39704 13.5015 6.32492 13.3226 6.32258H7.67742Z",
      fill: "currentColor"
    }, null, -1);
    var _hoisted_3 = [_hoisted_2];
    var _hoisted_4 = ["id"];
    var _hoisted_5 = /*#__PURE__*/vue.createElementVNode("rect", {
      width: "14",
      height: "14",
      fill: "white"
    }, null, -1);
    var _hoisted_6 = [_hoisted_5];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("svg", vue.mergeProps({
        width: "14",
        height: "14",
        viewBox: "0 0 14 14",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      }, _ctx.pti()), [vue.createElementVNode("g", {
        clipPath: "url(#".concat($options.pathId, ")")
      }, _hoisted_3, 8, _hoisted_1), vue.createElementVNode("defs", null, [vue.createElementVNode("clipPath", {
        id: "".concat($options.pathId)
      }, _hoisted_6, 8, _hoisted_4)])], 16);
    }

    script.render = render;

    return script;

})(primevue.baseicon, primevue.utils, Vue);
