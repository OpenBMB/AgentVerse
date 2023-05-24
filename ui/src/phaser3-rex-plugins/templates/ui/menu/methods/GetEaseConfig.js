var GetEaseConfig = function (easeConfig, menu) {
    if (easeConfig.sameOrientation) {
        easeConfig.orientation = menu.orientation;
    } else {
        easeConfig.orientation = (menu.orientation === 0) ? 1 : 0;
    }
    return easeConfig;
}

export default GetEaseConfig;