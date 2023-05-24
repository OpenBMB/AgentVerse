var GetProgress = function (scene) {
    var loader = scene.load;
    var total = loader.totalToLoad - 1;
    var remainder = loader.list.size + loader.inflight.size - 1;
    var progress = 1 - (remainder / total);
    return progress;
}

export default GetProgress;
