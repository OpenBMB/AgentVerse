const BringToTop = Phaser.Utils.Array.BringToTop;
const SendToBack = Phaser.Utils.Array.SendToBack;
const MoveUp = Phaser.Utils.Array.MoveUp;
const MoveDown = Phaser.Utils.Array.MoveDown;
const MoveAbove = Phaser.Utils.Array.MoveAbove;
const MoveBelow = Phaser.Utils.Array.MoveBelow;

export default {
    moveChildToFist(child) {
        SendToBack(this.children, child);
        return this;
    },

    moveChildToLast(child) {
        BringToTop(this.children, child);
        return this;
    },
    movechildUp(child) {
        MoveUp(this.children, child);
        return this;
    },

    movechildDown(child) {
        MoveDown(this.children, child);
        return this;
    },

    movechildAbove(child, baseChild) {
        MoveAbove(this.children, child, baseChild);
        return this;
    },

    movechildBelow(child, baseChild) {
        MoveBelow(this.children, child, baseChild);
        return this;
    },

}