import TickTask from './TickTask';

export default SceneUpdateTickTask;

declare namespace SceneUpdateTickTask {
    interface IConfig extends TickTask.IConfig {
        tickEventName?: string;
    }
}

declare class SceneUpdateTickTask extends TickTask {
    constructor(
        parent?: Object,
        config?: SceneUpdateTickTask.IConfig
    );

}