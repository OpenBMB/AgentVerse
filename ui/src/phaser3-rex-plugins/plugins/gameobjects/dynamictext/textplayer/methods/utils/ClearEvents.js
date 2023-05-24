import { ClearEvents as Events } from './Events.js';

var ClearEvents = function (textPlayer) {
    for (var i = 0, cnt = Events.length; i < cnt; i++) {
        textPlayer.emit(Events[i]);
    }
}

export default ClearEvents;