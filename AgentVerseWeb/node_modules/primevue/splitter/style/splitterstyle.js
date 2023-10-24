this.primevue = this.primevue || {};
this.primevue.splitter = this.primevue.splitter || {};
this.primevue.splitter.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var css = "\n@layer primevue {\n    .p-splitter {\n        display: flex;\n        flex-wrap: nowrap;\n    }\n\n    .p-splitter-vertical {\n        flex-direction: column;\n    }\n\n    .p-splitter-gutter {\n        flex-grow: 0;\n        flex-shrink: 0;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        cursor: col-resize;\n    }\n\n    .p-splitter-horizontal.p-splitter-resizing {\n        cursor: col-resize;\n        user-select: none;\n    }\n\n    .p-splitter-horizontal > .p-splitter-gutter > .p-splitter-gutter-handle {\n        height: 24px;\n        width: 100%;\n    }\n\n    .p-splitter-horizontal > .p-splitter-gutter {\n        cursor: col-resize;\n    }\n\n    .p-splitter-vertical.p-splitter-resizing {\n        cursor: row-resize;\n        user-select: none;\n    }\n\n    .p-splitter-vertical > .p-splitter-gutter {\n        cursor: row-resize;\n    }\n\n    .p-splitter-vertical > .p-splitter-gutter > .p-splitter-gutter-handle {\n        width: 24px;\n        height: 100%;\n    }\n}\n";
    var classes = {
      root: function root(_ref) {
        var props = _ref.props;
        return ['p-splitter p-component', 'p-splitter-' + props.layout];
      },
      gutter: 'p-splitter-gutter',
      gutterHandler: 'p-splitter-gutter-handle'
    };
    var inlineStyles = {
      root: function root(_ref2) {
        var props = _ref2.props;
        return [{
          display: 'flex',
          'flex-wrap': 'nowrap'
        }, props.layout === 'vertical' ? {
          'flex-direction': 'column'
        } : ''];
      }
    };
    var SplitterStyle = BaseStyle__default["default"].extend({
      name: 'splitter',
      css: css,
      classes: classes,
      inlineStyles: inlineStyles
    });

    return SplitterStyle;

})(primevue.base.style);
