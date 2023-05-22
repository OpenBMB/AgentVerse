import TickTask from '../SceneUpdateTickTask.js';
import Timer from './Timer.js';

class TimerTickTask extends TickTask {
    constructor(parent, config) {
        super(parent, config);
        this.timer = new Timer();
        // boot() later 
    }

    // override
    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        super.shutdown(fromScene);
        this.timer.destroy();
        this.timer = undefined;
    }

    start() {
        this.timer.start();
        super.start();
        return this;
    }

    stop() {
        this.timer.stop();
        super.stop();
        return this;
    }

    complete() {
        this.timer.stop();
        super.complete();
        return this;
    }

}

export default TimerTickTask;