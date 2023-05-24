var SetMaxFixedPartScale = function (scaleX, scaleY) {
    if (scaleY === undefined) {
        scaleY = scaleX;
    }

    this.maxFixedPartScaleX = scaleX;
    this.maxFixedPartScaleY = scaleY;
    return this;
};

export default SetMaxFixedPartScale;
