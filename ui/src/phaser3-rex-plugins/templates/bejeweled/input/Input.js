const GetValue = Phaser.Utils.Objects.GetValue;
class Input {
    constructor(bejeweled, config) {
        this.bejeweled = bejeweled;      // Bejeweled
        this.scene = bejeweled.scene; // Bejeweled.scene

        this.setEnable(GetValue(config, 'input.enable', true));
        this.boot();
    }

    boot() {
        // Touch control
        this.scene.input
            .on('pointerdown', this.selectChess1, this)
            .on('pointermove', this.selectChess2, this);
    }

    shutdown() {
        this.scene.input
            .off('pointerdown', this.selectChess1, this)
            .off('pointermove', this.selectChess2, this);
        this.bejeweled = undefined;
        this.scene = undefined;
    }

    destroy() {
        this.shutdown();
        return this;
    }

    setEnable(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        this.enable = enabled;
        return this;
    }

    selectChess1(pointer) {
        if (!this.enable) {
            return this;
        }
        var chess = this.bejeweled.worldXYToChess(pointer.worldX, pointer.worldY);
        if (chess) {
            this.bejeweled.selectChess1(chess);
        }
    }

    selectChess2(pointer) {
        if (!this.enable) {
            return this;
        }

        if (!pointer.isDown) {
            return;
        }
        var chess = this.bejeweled.worldXYToChess(pointer.worldX, pointer.worldY);
        if (chess && (chess !== this.bejeweled.getSelectedChess1())) {
            this.bejeweled.selectChess2(chess);
        }
    }
}

export default Input;