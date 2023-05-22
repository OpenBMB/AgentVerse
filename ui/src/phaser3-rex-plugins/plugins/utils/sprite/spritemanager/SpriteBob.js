import BobBase from '../../gameobject/gomanager/bobbase/BobBase.js';

class SpriteBob extends BobBase {
    playAnimation(key) {
        this.gameObject.anims.timeScale = this.timeScale;
        this.gameObject.play(key);
        return this;
    }

    stopAnimation() {
        this.gameObject.stop();
        return this;
    }

    chainAnimation(keys) {
        this.gameObject.chain(keys);
        return this;
    }

    pauseAnimation() {
        this.gameObject.anims.pause();
        return this;
    }

    setTimeScale(timeScale) {
        super.setTimeScale(timeScale);

        if (this.gameObject.anims) {
            this.gameObject.anims.timeScale = timeScale;
        }

        return this;
    }
}

export default SpriteBob;