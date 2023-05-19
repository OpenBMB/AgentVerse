import GetGame from '../../../utils/system/GetGame.js';
import { WaitEvent } from '../../../utils/promise/WaitEvent.js'
import Delay from '../../../utils/promise/Delay.js';

var ClickPromise = function ({ game, fileInput, closeDelay }) {
    return WaitEvent(GetGame(game).events, 'focus')
        .then(function () {
            return Delay(closeDelay);
        })
        .then(function () {
            var result = {
                files: fileInput.files
            }

            return Promise.resolve(result);
        })
}

export default ClickPromise;