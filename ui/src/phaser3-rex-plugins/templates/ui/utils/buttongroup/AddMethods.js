import Click from '../../click/Click.js';
import InjectSelectedProperty from './InjectSelectedProperty.js';

export default {
    add(gameObject) {
        this.buttons.push(gameObject);

        //Default: Fire 'click' event when touch released after pressed.
        if (!gameObject._click) {
            gameObject._click = new Click(gameObject, this.clickConfig);

            gameObject._click
                .on('click', function (buttonBehavior, gameObject, pointer, event) {
                    this.fireEvent('button.click', gameObject, pointer, event);
                }, this)
                .on('enable', function (buttonBehavior, gameObject) {
                    this.fireEvent('button.enable', gameObject);
                }, this)
                .on('disable', function (buttonBehavior, gameObject) {
                    this.fireEvent('button.disable', gameObject);
                }, this)

            gameObject
                .on('pointerover', function (pointer, localX, localY, event) {
                    this.fireEvent('button.over', gameObject, pointer, event);
                }, this)
                .on('pointerout', function (pointer, event) {
                    this.fireEvent('button.out', gameObject, pointer, event);
                }, this)
        }

        if (this.buttonsType) {
            if (gameObject.name === undefined) {
                console.error(`${this.parent.constructor.name}: Option button miss value`)
            }

            InjectSelectedProperty.call(this, gameObject);
        }


        return this;
    },

    addMultiple(gameObjects) {
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            this.add(gameObjects[i]);
        }
        return this;
    }
}