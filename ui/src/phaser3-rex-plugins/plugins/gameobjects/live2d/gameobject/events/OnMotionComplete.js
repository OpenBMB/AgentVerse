var OnMotionComplete = function (gameObject, group, no) {
    gameObject.emit(`motion.complete-${group}`, no);
    gameObject.emit('motion.complete', group, no);
}

export default OnMotionComplete;