import Container from '../../container/Container.js';

const ContainerSetChildVisible = Container.prototype.setChildVisible;

var SwapPage = function (key, fadeInDuration) {
    this._previousKey = this._currentKey;
    var prevoiusPage = this.previousPage;
    if (prevoiusPage) {
        if (this.swapMode === 0) { // Invisible
            ContainerSetChildVisible.call(this, prevoiusPage, false);
            this.emit('pageinvisible', prevoiusPage, this._previousKey, this);
        } else { // Destroy
            prevoiusPage.destroy();
        }
    }

    if (key && !this.sizerChildren.hasOwnProperty(key)) {
        this.emit('createpage', key, this);
    }

    this._currentKey = key;
    var currentPage = this.currentPage;
    if (currentPage) {
        ContainerSetChildVisible.call(this, currentPage, true);
        this.emit('pagevisible', currentPage, this._currentKey, this);

        if (fadeInDuration === undefined) {
            fadeInDuration = this.fadeInDuration;
        }

        if (fadeInDuration > 0) {
            currentPage.setAlpha(0).fadeIn(fadeInDuration, 1);
        }
    }
    return this;
}

export default SwapPage;