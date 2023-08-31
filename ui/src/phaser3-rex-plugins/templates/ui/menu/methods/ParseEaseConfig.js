import GetOrientationMode from '../../utils/GetOrientationMode.js';
var ParseEaseConfig = function (menu, easeConfig) {
    if (typeof (easeConfig) === 'number') {
        easeConfig = {
            duration: easeConfig
        };
    }

    if (easeConfig.hasOwnProperty('orientation') && (easeConfig.orientation !== undefined)) {
        easeConfig.sameOrientation = GetOrientationMode(easeConfig.orientation) === menu.orientation;
    } else {
        easeConfig.sameOrientation = true;
    }
    easeConfig.destroy = false;
    return easeConfig;
}

export default ParseEaseConfig;