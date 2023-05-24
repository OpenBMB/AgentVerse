// import * as Phaser from 'phaser';
import WaitEvents from './waitevents';

export default class WaitEventsPlugin extends Phaser.Plugins.BasePlugin {
    add(
        completeCallback?: WaitEvents.CompleteCallbackType,
        scope?: object
    ): WaitEvents;
}