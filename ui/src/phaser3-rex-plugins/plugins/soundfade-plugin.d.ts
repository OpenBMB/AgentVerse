import SoundFade from './soundfade';

export default class SoundFadePlugin extends Phaser.Plugins.BasePlugin {
    fadeIn: typeof SoundFade.fadeIn;
    fadeOut: typeof SoundFade.fadeOut;

}