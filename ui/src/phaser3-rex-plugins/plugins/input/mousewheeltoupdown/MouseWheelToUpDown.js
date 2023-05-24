import CursorKeys from '../../utils/input/CursorKeys.js';

class MouseWheelToUpDown extends CursorKeys {
    constructor(scene, config) {
        super(scene);

        this.scene = scene;
        this.boot();
    }

    boot() {
        this.scene.input.on('wheel', this.onWheeling, this);
        this.scene.sys.events.on('postupdate', this.clearAllKeysState, this);
        this.scene.sys.events.once('shutdown', this.destroy, this);
    }

    shutdown() {
        if (!this.scene) {
            return
        }

        this.scene.input.off('wheel', this.onWheeling, this);
        this.scene.sys.events.off('postupdate', this.clearAllKeysState, this);
        this.scene.sys.events.off('shutdown', this.destroy, this);
        this.scene = undefined;

        super.shutdown();
    }

    destroy() {
        this.shutdown();
    }

    onWheeling(pointer, currentlyOver, dx, dy, dz, event) {
        this.setKeyState('up', dy < 0);
        this.setKeyState('down', dy > 0);
    }
    
    get up() {
        return this.upKeyDown;
    }

    get down() {
        return this.downKeyDown;
    }
        
    get noKey() {
        return this.noKeyDown;
    }
}

export default MouseWheelToUpDown;