import { ClearEvents as Events } from './Events.js';

var ClearEvents = function (tagPlayer) {
    for (var i = 0, cnt = Events.length; i < cnt; i++) {
        tagPlayer.emit(Events[i]);
    }
}

export default ClearEvents;