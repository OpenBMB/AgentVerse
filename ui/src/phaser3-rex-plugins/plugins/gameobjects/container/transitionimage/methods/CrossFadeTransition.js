var OnStart = function (parent, currentImage, nextImage, t) {
}

var OnProgress = function (parent, currentImage, nextImage, t) {
    parent
        .setChildLocalAlpha(currentImage, 1 - t)
        .setChildLocalAlpha(nextImage, t)
}

var OnComplete = function (parent, currentImage, nextImage, t) {
    parent.setChildLocalAlpha(currentImage, 1)
}

export {
    OnStart, OnProgress, OnComplete
}