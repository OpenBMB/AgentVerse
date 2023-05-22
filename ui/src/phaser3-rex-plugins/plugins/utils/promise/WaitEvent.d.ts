// import * as Phaser from 'phaser';

export function WaitEvent(
    eventEmitter: Phaser.Events.EventEmitter,
    eventName: string
): Promise<any>;

export function WaitComplete(
    eventEmitter: Phaser.Events.EventEmitter,
): Promise<any>;
