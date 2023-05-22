import BaseClock from './BaseClock.js';
import GetGame from '../../utils/system/GetGame.js'

class Clock extends BaseClock {
    startTicking() {
        super.startTicking();
        GetGame(this.parent).events.on('step', this.update, this);
    }

    stopTicking() {
        super.stopTicking();
        GetGame(this.parent).events.off('step', this.update, this);
    }

    update(time, delta) {
        if ((!this.isRunning) || (this.timeScale === 0)) {
            return this;
        }
        this.tick(delta);
        return this;
    }
}

export default Clock;