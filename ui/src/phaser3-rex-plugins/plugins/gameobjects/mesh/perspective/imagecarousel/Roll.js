import Base from '../carousel/Roll.js';

class Roll extends Base {

    toNext(duration) {
        var gameObject = this.parent;
        if (!gameObject.repeat && gameObject.isLastImage) {
            return this;
        }

        if (this.isRunning) {
            return this;
        }

        gameObject.setImageIndex(gameObject.currentImageIndex + 1);
        super
            .toNext(duration)
            .once('complete', gameObject.updateTexture, gameObject)

        return this;
    }

    toPrevious(duration) {
        var gameObject = this.parent;
        if (!gameObject.repeat && gameObject.isFirstImage) {
            return this;
        }

        if (this.isRunning) {
            return this;
        }

        gameObject.setImageIndex(gameObject.currentImageIndex - 1);
        super
            .toPrevious(duration)
            .once('complete', gameObject.updateTexture, gameObject)

        return this;
    }
}

export default Roll;