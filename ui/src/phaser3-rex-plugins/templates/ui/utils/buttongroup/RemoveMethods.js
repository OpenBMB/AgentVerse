const RemoveItem = Phaser.Utils.Array.Remove;

export default {
    remove(gameObject) {
        if (this.buttonsType) {
            delete gameObject.selected;
        }

        RemoveItem(this.buttons, gameObject);

        return this;
    },

    clear() {
        if (this.buttonsType) {
            var buttons = this.buttons;
            for (var i = 0, cnt = buttons.length; i < cnt; i++) {
                delete buttons[i].selected;
            }
        }

        this.buttons.length = 0;

        return this;
    }
}