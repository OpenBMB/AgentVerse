import EaseValueTaskBase from '../../utils/componentbase/tweentask/EaseValueTaskBase.js';
import IsSoundObject from '../../utils/system/IsSoundObject.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const Linear = Phaser.Math.Linear;

class Fade extends EaseValueTaskBase {
    constructor(scene, sound, config) {
        if (IsSoundObject(scene)) {
            config = sound;
            sound = scene;
            scene = undefined;
        }

        sound.active = true;
        sound.scene = scene;
        sound.game = sound.manager.game;

        super(sound, config);
        // this.parent = parent
        // this.timer

        this.volume = {};
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        super.resetFromJSON(o);
        this.setMode(GetValue(o, 'mode', 0));
        this.setEnable(GetValue(o, 'enable', true));
        this.setVolumeRange(
            GetAdvancedValue(o, 'volume.start', this.parent.volume),
            GetAdvancedValue(o, 'volume.end', 0)
        );
        return this;
    }

    setMode(m) {
        if (typeof (m) === 'string') {
            m = MODE[m];
        }
        this.mode = m;
        return this;
    }

    setVolumeRange(start, end) {
        this.volume.start = start;
        this.volume.end = end;
        return this;
    }

    start() {
        if (this.timer.isRunning) {
            return this;
        }

        this.parent.setVolume(this.volume.start);

        this.timer
            .setDelay(this.delay)
            .setDuration(this.duration);

        super.start();
        return this;
    }

    updateGameObject(parent, timer) {
        parent.volume = Linear(this.volume.start, this.volume.end, timer.t);
    }

    complete() {
        super.complete();

        switch (this.mode) {
            case 1:
                this.parent.stop();
                break;
            case 2:
                this.parent.destroy();
                break;
        }

        return this;
    }
}

const MODE = {
    stop: 1,
    destroy: 2
}

export default Fade;