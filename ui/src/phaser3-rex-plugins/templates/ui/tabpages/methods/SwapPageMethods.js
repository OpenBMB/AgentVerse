var SwapPage = function (key, fadeInDuration) {
    var index;
    if (typeof (key) === 'number') {
        index = key;
    } else {
        index = this.getPageIndex(key);
    }

    if (index != null) {
        // Override fadeInDuration
        var fadeInDurationSave;
        if (fadeInDuration !== undefined) {
            fadeInDurationSave = this.childrenMap.pages.fadeInDuration;
            this.childrenMap.pages.fadeInDuration = fadeInDuration;
        }

        this.childrenMap.tabs.emitButtonClick(index);

        // Restore fadeInDuration
        if (fadeInDurationSave !== undefined) {
            this.childrenMap.pages.fadeInDuration = fadeInDurationSave;
        }
    }

    return this;
}

var SwapFirstPage = function (fadeInDuration) {
    this.swapPage(0, fadeInDuration);
    return this;
}

var SwapLastPage = function (fadeInDuration) {
    var index = this.getElement('tabs.buttons').length - 1;
    this.swapPage(index, fadeInDuration);
    return this;
}


export default {
    swapPage: SwapPage,
    swapFirstPage: SwapFirstPage,
    swapLastPage: SwapLastPage,
};