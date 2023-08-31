import { WaitComplete } from '../../../../utils/promise/WaitEvent.js';

export default {
    play(content) {
        this.parser.start(content);
        return this;
    },

    playPromise(content) {
        var promise = WaitComplete(this);
        this.play(content);
        return promise;
    },

}