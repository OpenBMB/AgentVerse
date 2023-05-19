var Yoyo = function (t, threshold) {
    if (threshold === undefined) {
        threshold = 0.5;
    }
    if (t <= threshold) {
        t = t / threshold;
    } else {
        t = 1 - ((t - threshold) / (1 - threshold));
    }

    return t;
}

export default Yoyo;