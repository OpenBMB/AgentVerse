// import * as Phaser from 'phaser';
import Button from '../../../../plugins/button';
import Tap from '../../../../plugins/input/gestures/tap/Tap';
import Press from '../../../../plugins/input/gestures/press/Press';
import Swipe from '../../../../plugins/input/gestures/swipe/Swipe';

export default SetChildrenInteractive;

declare namespace SetChildrenInteractive {
    interface IConfig {
        targets?: Phaser.GameObjects.GameObject[],

        click?: Button.IConfig | boolean,
        over?: {} | boolean,
        tap?: Tap.IConfig | boolean,
        press?: Press.IConfig | boolean,
        swipe?: Swipe.IConfig | boolean,

        inputEventPrefix?: string,
        eventEmitter?: Phaser.Events.EventEmitter,
    }
}

declare function SetChildrenInteractive(
    gameObject: Phaser.GameObjects.GameObject,
    config?: SetChildrenInteractive.IConfig
): Phaser.GameObjects.GameObject;