this.primevue = this.primevue || {};
this.primevue.card = this.primevue.card || {};
this.primevue.card.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var classes = {
      root: 'p-card p-component',
      header: 'p-card-header',
      body: 'p-card-body',
      title: 'p-card-title',
      subtitle: 'p-card-subtitle',
      content: 'p-card-content',
      footer: 'p-card-footer'
    };
    var CardStyle = BaseStyle__default["default"].extend({
      name: 'card',
      classes: classes
    });

    return CardStyle;

})(primevue.base.style);
