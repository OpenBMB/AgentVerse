import PropertyMethods from './PropertyMethods.js';
import CallMethods from './CallMethods.js';
import DataMethods from './DataMethods.js';

class BobBase {
    constructor(GOManager, gameObject, name) {
        this.GOManager = GOManager;
        this.tweens = {};
        this.setGO(gameObject, name);
    }

    get scene() {
        return this.GOManager.scene;
    }

    get timeScale() {
        return this.GOManager.timeScale;
    }

    destroy() {
        this.freeGO();
        this.GOManager = undefined;
    }

    freeTweens() {
        var tweenTasks = this.tweens,
            tweenTask;
        for (var propName in tweenTasks) {
            tweenTask = tweenTasks[propName];
            if (tweenTask) {
                tweenTask.remove();
            }
            tweenTasks[propName] = null;
        }
        return this;
    }

    freeGO() {
        this.freeTweens();
        this.gameObject.destroy();
        this.gameObject = undefined;
        return this;
    }

    setGO(gameObject, name) {
        gameObject.setName(name);
        this.gameObject = gameObject;
        this.name = name;
        this.freeTweens();
        return this;
    }

    setTimeScale(timeScale) {
        var tweenTasks = this.tweens;
        for (var key in tweenTasks) {
            var tweenTask = tweenTasks[key];
            if (tweenTask) {
                tweenTask.timeScale = timeScale;
            }
        }

        return this;
    }

}

Object.assign(
    BobBase.prototype,
    PropertyMethods,
    CallMethods,
    DataMethods
)
export default BobBase;