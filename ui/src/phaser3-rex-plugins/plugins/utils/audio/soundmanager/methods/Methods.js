import BackgroundMusicMethods from './BackgroundMusicMethods.js';
import BackgroundMusic2Methods from './BackgroundMusic2Methods.js';
import SoundEffectsMethods from './SoundEffectsMethods.js';
import SoundEffects2Methods from './SoundEffects2Methods.js';

var Methods = {};

Object.assign(
    Methods,
    BackgroundMusicMethods, BackgroundMusic2Methods,
    SoundEffectsMethods, SoundEffects2Methods,
)

export default Methods;