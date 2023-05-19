import { WaitEvent, WaitComplete, Delay } from './eventpromise'

export default class EventPromisePlugin extends Phaser.Plugins.BasePlugin {
    waitEvent: typeof WaitEvent;
    waitComplete: typeof WaitComplete;
    delay: typeof Delay;
}