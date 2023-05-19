var OnMotionStart = function (gameObject, group, no) {
    gameObject.emit(`motion.start-${group}`, no);
    gameObject.emit('motion.start', group, no);
}

export default OnMotionStart;