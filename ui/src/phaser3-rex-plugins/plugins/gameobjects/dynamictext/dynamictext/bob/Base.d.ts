// import * as Phaser from 'phaser';
import DataMethods from '../../../../utils/data/DataMethods';
import DynamicText from '../DynamicText';

export default class Base extends DataMethods {
    parent: DynamicText;
    readonly type: string;
    readonly renderable: boolean;

    setActive(active?: boolean): this;
    active: boolean;

    setDirty(dirty?: boolean): this;

    scene: Phaser.Scene;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    render(): void;
    contains(x: number, y: number): boolean;
}