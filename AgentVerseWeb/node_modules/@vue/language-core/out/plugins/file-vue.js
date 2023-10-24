"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseSfc_1 = require("../utils/parseSfc");
const plugin = (_ctx) => {
    return {
        version: 1,
        parseSFC(_fileName, content) {
            return (0, parseSfc_1.parse)(content);
        },
        updateSFC(sfc, change) {
            const blocks = [
                sfc.descriptor.template,
                sfc.descriptor.script,
                sfc.descriptor.scriptSetup,
                ...sfc.descriptor.styles,
                ...sfc.descriptor.customBlocks,
            ].filter((block) => !!block);
            const hitBlock = blocks.find(block => change.start >= block.loc.start.offset && change.end <= block.loc.end.offset);
            if (!hitBlock) {
                return;
            }
            hitBlock.content =
                hitBlock.content.substring(0, change.start - hitBlock.loc.start.offset)
                    + change.newText
                    + hitBlock.content.substring(change.end - hitBlock.loc.start.offset);
            const lengthDiff = change.newText.length - (change.end - change.start);
            for (const block of blocks) {
                if (block.loc.start.offset > change.end) {
                    block.loc.start.offset += lengthDiff;
                }
                if (block.loc.end.offset >= change.end) {
                    block.loc.end.offset += lengthDiff;
                }
            }
            return sfc;
        },
    };
};
exports.default = plugin;
//# sourceMappingURL=file-vue.js.map