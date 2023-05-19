var IsAnyMotionPlaying = function() {
    return !this._motionManager.isFinished();
}

export default IsAnyMotionPlaying;