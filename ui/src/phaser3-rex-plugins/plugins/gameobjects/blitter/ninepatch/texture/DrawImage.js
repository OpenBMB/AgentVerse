import AddImage from '../../blitterbase/utils/AddImage.js';

var DrawImage = function (key, frame, x, y, width, height) {
    AddImage(this, {
        frame: frame,
        x: x,
        y: y,
        width: width,
        height: height
    })
}

export default DrawImage;