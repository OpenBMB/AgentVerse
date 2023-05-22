import ComponentBase from '../../../utils/componentbase/ComponentBase';

export default StepRunner;

declare namespace StepRunner {

}

declare class StepRunner extends ComponentBase {
    constructor(
        parent: Phaser.Scene | Phaser.GameObjects.GameObject,
    );

    add(
        command: any[],
        scope?: object
    ): this
}