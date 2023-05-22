import Builders from './builders/Builders';
export default Make;

declare namespace Make {
    type BuilderType = Builders.BuilderType;
    type BuildersType = { [name: string]: BuilderType }
}

declare function Make(
    scene: Phaser.Scene,
    data: Object,
    view?: Object,
    styles?: Object,
    customBuilders?: Make.BuildersType
): Phaser.GameObjects.GameObject;