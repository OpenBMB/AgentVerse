import OpenCloseTransition from '../../../../plugins/behaviors/openclosetransition/OpenCloseTransition.js';

class Transition extends OpenCloseTransition {
    constructor(gameObject, config) {
        if (config === undefined) {
            config = {};
        }
        config.destroy = false;
        super(gameObject, config);
    }

    onOpen() {
        this.emit('open', this.parent, this);
        super.onOpen();
    }

    onClose() {
        this.emit('close', this.parent, this);
        super.onClose();
    }

}

export default Transition;