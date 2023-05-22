import { TypingAnimationTimerType, } from './TimerTypes.js';

var SetSkipTypingAnimation = function (value) {
    if (value === undefined) {
        value = true;
    }
    this.skipTypingAnimation = value;

    if (value) {
        // Skip current playing typing-animation
        var timers = this.timeline.getTimers(TypingAnimationTimerType);
        for (var i = 0, cnt = timers.length; i < cnt; i++) {
            timers[i].seek(1);
        }
    }
    return this;
}

export default SetSkipTypingAnimation;