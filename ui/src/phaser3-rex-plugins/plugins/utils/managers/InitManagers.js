import SoundManager from '../audio/soundmanager/SoundManager.js';
import Timeline from '../../time/progresses/Timeline.js';
import WaitEventManager from './waiteventmanager/WaitEventManager.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var InitManagers = function (scene, config) {
    this.managersScene = scene;

    var soundManagerConfig = GetValue(config, 'sounds');
    if (soundManagerConfig !== false) {
        this.soundManager = new SoundManager(scene, soundManagerConfig);
    }

    this.gameObjectManagers = {};

    this.timeline = new Timeline(this);

    this.waitEventManager = new WaitEventManager(this, config);

    return this;
}

export default InitManagers;