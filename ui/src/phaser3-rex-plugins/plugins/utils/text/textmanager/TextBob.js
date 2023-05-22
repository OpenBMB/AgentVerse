import BobBase from '../../gameobject/gomanager/bobbase/BobBase.js';
import TextTyping from '../../../behaviors/texttyping/TextTyping.js';

const IsTyping = false;

class TextBob extends BobBase {
    setGO(gameObject, name) {
        super.setGO(gameObject, name);
        gameObject.setData('typing', !IsTyping);
        return this;
    }

    clearText() {
        this.gameObject.setText('');
        return this;
    }

    appendText(text) {
        this.gameObject.setText(this.gameObject.text + text);
        return this;
    }

    setTypingSpeed(speed) {
        var gameObject = this.gameObject;
        if (!gameObject.typing) {
            gameObject.typing = new TextTyping(gameObject);
        }
        gameObject.typing.setTypingSpeed(speed);
        return this;
    }

    clearTyping() {
        var gameObject = this.gameObject;
        if (!gameObject.typing) {
            gameObject.typing = new TextTyping(gameObject);
        } else {
            gameObject.typing.start('');
        }
        return this;
    }

    typing(text, speed) {
        var gameObject = this.gameObject;
        if (!gameObject.typing) {
            gameObject.typing = new TextTyping(gameObject);
        }

        if (speed !== undefined) {
            gameObject.typing.setTypingSpeed(speed);
        }

        gameObject.setData('typing', IsTyping);
        gameObject.typing
            .once('complete', function () {
                gameObject.setData('typing', !IsTyping);
            })
            .appendText(text)

        return this;
    }
}

export default TextBob;