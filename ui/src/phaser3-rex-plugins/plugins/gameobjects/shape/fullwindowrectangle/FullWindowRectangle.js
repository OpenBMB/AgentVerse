const Rectangle = Phaser.GameObjects.Rectangle;

class FullWindowRectangle extends Rectangle {
    constructor(scene, color, alpha) {
        super(scene, 0, 0, 2, 2, color, 1);

        this.setAlpha(alpha)
        this.setScrollFactor(0);
        this.boot();
    }

    boot() {
        var scene = this.scene;
        scene.sys.events.on('prerender', this.resize, this);
    }

    destroy(fromScene) {  // preDestroy method does not have fromScene parameter
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        this.scene.sys.events.off('prerender', this.resize, this);

        super.destroy(fromScene);
    }

    get tint() {
        return this.fillColor;
    }

    set tint(value) {
        this.setFillStyle(value, this.fillAlpha);
    }

    resize() {
        var scene = this.scene;
        var gameSize = scene.sys.scale.gameSize;
        var camera = scene.sys.cameras.main;

        var gameWidth = gameSize.width,
            gameHeight = gameSize.height,
            scale = 1 / camera.zoom;

        var x = gameWidth / 2,
            y = gameHeight / 2,
            width = gameWidth * scale,
            height = gameHeight * scale;

        if ((this.x !== x) || (this.y !== y)) {
            this.setPosition(x, y);
        }

        if ((this.width !== width) || (this.height !== height)) {
            this.setSize(width, height).setOrigin(0.5);
        }

    }

}

export default FullWindowRectangle;