import { StopPlayEvent } from './utils/Events.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var TypingNextPage = function () {
    if (!this.isPlaying || this.isPageTyping) {
        return this;
    }

    this.typeWriter
        .once('page.fadeout', _TypingNextPage, this)
        .fadeOutPage();
    return this;
}

var _TypingNextPage = function () {
    var result = this.runWrap(this.lastWrapResult);
    this.lastWrapResult = result;

    this.emit('page.start');

    var OnTypingPageComplete = function () {
        this.emit(StopPlayEvent);  // Clear registed StopPlayEvent
        if (result.isLastPage) {
            this.emit('complete');
        } else {
            this.emit('page.complete');

            if (this.ignoreNextPageInput) {
                TypingNextPage.call(this);
            } else if (this.nextPageInput) {
                this.nextPageInput(TypingNextPage, [], this);
            } else {
                // Stop here, don't typing next page.
            }

        }
    }

    // Remove event when typing pages has been canceled
    this.once(StopPlayEvent, function () {
        this.typeWriter.off('complete', OnTypingPageComplete, this);
    })

    this.typeWriter
        .once('complete', OnTypingPageComplete, this)
        .start(result.children);
}

export default TypingNextPage;