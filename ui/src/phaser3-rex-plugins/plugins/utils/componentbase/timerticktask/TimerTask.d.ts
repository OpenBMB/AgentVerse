import SceneUpdateTickTask from '../SceneUpdateTickTask';

export default TimerTask;

declare namespace TimerTask {
    interface IConfig extends SceneUpdateTickTask.IConfig {
    }
}

declare class TimerTask extends SceneUpdateTickTask {
    constructor(
        parent?: Object,
        config?: TimerTask.IConfig
    );

}