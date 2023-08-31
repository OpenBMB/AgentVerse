import Builders from './builders/Builders';
export default YAMLMake;

declare namespace YAMLMake {
    type BuilderType = Builders.BuilderType;
    type BuildersType = { [name: string]: BuilderType }
}

declare function YAMLMake(
    scene: Phaser.Scene,
    data: Object | string,
    view?: Object | string,
    styles?: Object | string,
    customBuilders?: YAMLMake.BuildersType
): Phaser.GameObjects.GameObject;