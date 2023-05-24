import { IsCommand, IsSpaceChar } from '../../dynamictext/bob/Types.js';
import { TypingDelayTimerType, TypingAnimationTimerType, } from './TimerTypes.js';

var Typing = function (offsetTime) {
    if (offsetTime === undefined) {
        offsetTime = 0;
    }

    var delay = 0;
    this.inTypingProcessLoop = true;
    while (this.inTypingProcessLoop) {
        var child = this.getNextChild();
        if (!child) {
            if (this.timeline.isRunning) {
                // Wait until last animationConfig is end
                this.timeline.once('complete', function () {
                    this.isPageTyping = false;
                    this.emit('complete');
                }, this);
            } else {
                this.isPageTyping = false;
                this.emit('complete');
            }
            break;  // Leave this typing loop
        }

        if (child.renderable) {
            // Typing this char
            var animationConfig = this.animationConfig;
            if (animationConfig.duration > 0) {
                var animationTimer = this.timeline.addTimer({
                    name: TypingAnimationTimerType,
                    target: child,
                    duration: animationConfig.duration,
                    yoyo: animationConfig.yoyo,
                    onStart: animationConfig.onStart,
                    onProgress: animationConfig.onProgress,
                    onComplete: animationConfig.onComplete,
                })
                if (this.skipTypingAnimation) {
                    animationTimer.seek(1);
                }
            } else {  // No animationConfig, only invoke onStart callback
                if (animationConfig.onStart) {
                    animationConfig.onStart(child, 0);
                }
            }

            // Set to min size
            if (this.minSizeEnable) {
                this.textPlayer.setToMinSize();
            }

            this.textPlayer.emit('typing', child);

            var nextChild = this.nextChild;
            if (nextChild) {
                if (this.skipSpaceEnable && IsSpaceChar(nextChild)) {
                    // Don't have delay when typing a space character
                } else {
                    delay += (this.speed + offsetTime);
                    offsetTime = 0;
                    if (delay > 0) {
                        // Process next character later
                        this.typingTimer = this.timeline.addTimer({
                            name: TypingDelayTimerType,
                            target: this,
                            duration: delay,
                            onComplete: function (target, t, timer) {
                                target.typingTimer = undefined;
                                Typing.call(target, timer.remainder);
                            }
                        })
                        break;  // Leave this typing loop     
                    }
                }
            }
            // Process next child
        } else if (IsCommand(child)) {
            child.exec();
            // Process next child
        }

    }

    // Set to min size
    if (this.minSizeEnable) {
        this.textPlayer.setToMinSize();
    }

    this.inTypingProcessLoop = false;
}

export default Typing;