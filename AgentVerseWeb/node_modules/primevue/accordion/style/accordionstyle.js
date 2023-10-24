this.primevue = this.primevue || {};
this.primevue.accordion = this.primevue.accordion || {};
this.primevue.accordion.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var css = "\n@layer primevue {\n    .p-accordion-header-action {\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        user-select: none;\n        position: relative;\n        text-decoration: none;\n    }\n    \n    .p-accordion-header-action:focus {\n        z-index: 1;\n    }\n    \n    .p-accordion-header-text {\n        line-height: 1;\n    }\n}\n";
    var classes = {
      root: 'p-accordion p-component',
      tab: {
        root: function root(_ref) {
          var instance = _ref.instance,
            index = _ref.index;
          return ['p-accordion-tab', {
            'p-accordion-tab-active': instance.isTabActive(index)
          }];
        },
        header: function header(_ref2) {
          var instance = _ref2.instance,
            tab = _ref2.tab,
            index = _ref2.index;
          return ['p-accordion-header', {
            'p-highlight': instance.isTabActive(index),
            'p-disabled': instance.getTabProp(tab, 'disabled')
          }];
        },
        headerAction: 'p-accordion-header-link p-accordion-header-action',
        headerIcon: 'p-accordion-toggle-icon',
        headerTitle: 'p-accordion-header-text',
        toggleableContent: 'p-toggleable-content',
        content: 'p-accordion-content'
      }
    };
    var AccordionStyle = BaseStyle__default["default"].extend({
      name: 'accordion',
      css: css,
      classes: classes
    });

    return AccordionStyle;

})(primevue.base.style);
