this.primevue = this.primevue || {};
this.primevue.terminal = this.primevue.terminal || {};
this.primevue.terminal.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var css = "\n@layer primevue {\n    .p-terminal {\n        height: 18rem;\n        overflow: auto;\n    }\n\n    .p-terminal-prompt-container {\n        display: flex;\n        align-items: center;\n    }\n\n    .p-terminal-input {\n        flex: 1 1 auto;\n        border: 0 none;\n        background-color: transparent;\n        color: inherit;\n        padding: 0;\n        outline: 0 none;\n    }\n\n    .p-terminal-input::-ms-clear {\n        display: none;\n    }\n}\n";
    var classes = {
      root: 'p-terminal p-component',
      content: 'p-terminal-content',
      prompt: 'p-terminal-prompt',
      command: 'p-terminal-command',
      response: 'p-terminal-response',
      container: 'p-terminal-prompt-container',
      commandText: 'p-terminal-input'
    };
    var TerminalStyle = BaseStyle__default["default"].extend({
      name: 'terminal',
      css: css,
      classes: classes
    });

    return TerminalStyle;

})(primevue.base.style);
