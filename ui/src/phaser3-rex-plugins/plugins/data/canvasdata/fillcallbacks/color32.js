var FillCallback = function (imgData, imgDataIndex) {
    return (imgData[imgDataIndex + 3] << 24) |
        (imgData[imgDataIndex + 0] << 16) |
        (imgData[imgDataIndex + 1] << 8) |
        imgData[imgDataIndex + 2];
};

export default FillCallback;