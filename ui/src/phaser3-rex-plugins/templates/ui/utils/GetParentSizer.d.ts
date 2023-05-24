// import * as Phaser from 'phaser';
import BaseSizer from '../basesizer/BaseSizer';

export function GetParentSizer(
    gameObject: Phaser.GameObjects.GameObject,
    name?: string
): BaseSizer;

export function GetTopmostSizer(
    gameObject: Phaser.GameObjects.GameObject
): BaseSizer;