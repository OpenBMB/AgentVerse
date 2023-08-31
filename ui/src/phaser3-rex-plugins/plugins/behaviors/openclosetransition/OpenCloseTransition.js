import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import State from './State.js';
import Methods from './methods/Methods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class OpenCloseTransition extends ComponentBase {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;
        // this.scene

        this.setTransitInTime(GetValue(config, 'duration.in', 200));
        this.setTransitOutTime(GetValue(config, 'duration.out', 200));
        this.setTransitInCallback(GetValue(config, 'transitIn'));
        this.setTransitOutCallback(GetValue(config, 'transitOut'));

        this.oneShotMode = GetValue(config, 'destroy', false);

        this.delayCallTimer = undefined;
        this._state = new State(this, {
            eventEmitter: false,
            initState: GetValue(config, 'initState', 'IDLE')
        });
        this.openEventData = undefined;
        this.closeEventData = undefined;
    }

    get state() {
        return this._state.state;
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        this.transitInCallback = undefined;
        this.transitOutCallback = undefined;
        this.openEventData = undefined;
        this.closeEventData = undefined;

        this.removeDelayCall();

        super.shutdown(fromScene);
    }
}

Object.assign(
    OpenCloseTransition.prototype,
    Methods,
)

export default OpenCloseTransition;