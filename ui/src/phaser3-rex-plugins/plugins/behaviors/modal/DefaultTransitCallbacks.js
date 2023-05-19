import PopUp from '../../popup.js';
import ScaleDownDestroy from '../../scale-down-destroy.js';
import FadeIn from '../../fade-in.js';
import FadeOutDestroy from '../../fade-out-destroy.js';

export default {
    popUp(gameObject, duration) {
        if (gameObject._modalScaleSave !== undefined) {
            gameObject.scaleX = gameObject._modalScaleSave;
            gameObject.scaleY = gameObject._modalScaleSave;
        } else {
            gameObject._modalScaleSave = gameObject.scaleX;
        }

        PopUp(gameObject, duration);
    },

    scaleDown(gameObject, duration) {
        // Don't destroy here
        ScaleDownDestroy(gameObject, duration, undefined, undefined, false);
    },

    fadeIn(gameObject, duration) {
        if (gameObject._modalAlphaSave !== undefined) {
            gameObject.alpha = gameObject._modalAlphaSave;
        } else {
            gameObject._modalAlphaSave = gameObject.alpha;
        }

        FadeIn(gameObject, duration);
    },

    fadeOut(gameObject, duration) {
        // Don't destroy here
        FadeOutDestroy(gameObject, duration, false);
    },
}