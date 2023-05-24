// import * as Phaser from 'phaser';
import VirtualJoyStick from './virtualjoystick';

export default class VirtualJoyStickPlugin extends Phaser.Plugins.BasePlugin {
    add(
        scene: Phaser.Scene,
        config?: VirtualJoyStick.IConfig
    ): VirtualJoyStick;
}