const Zone = Phaser.GameObjects.Zone;

class TouchZone extends Zone {
    constructor(scene) {
        super(scene, 0, 0, 1, 1);
        scene.add.existing(this);  // Add to scene
        this.setScrollFactor(0);
        this.setInteractive({
            hitArea: {},
            hitAreaCallback: function () { return true; }
        });
    }
}
export default TouchZone;