var DrawFrame = function (frame, canvas) {
    canvas.width = frame.cutWidth;
    canvas.height = frame.cutHeight;
    var context = canvas.getContext('2d', { willReadFrequently: true });
    context.drawImage(frame.source.image, frame.cutX, frame.cutY, frame.cutWidth, frame.cutHeight);
    return canvas;
}

export default DrawFrame;