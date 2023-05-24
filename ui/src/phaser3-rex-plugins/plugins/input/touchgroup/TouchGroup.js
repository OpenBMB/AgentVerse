import IsSceneObject from '../../utils/system/IsSceneObject';
import Clear from '../../utils/object/Clear.js';

class TouchGroup {
    constructor(game) {
        if (IsSceneObject(game)) {
            game = game.game
        }
        this.ticker = game.loop;
        this.topObjects = {};
    }

    destroy() {
        this.ticker = undefined;
        this.topObjects = undefined;
    }

    isAtTop(groupName, key) {
        var result;
        var tick = this.ticker.frame;
        var item = this.topObjects[groupName];
        if (item) {
            if (item.tick < tick) {
                result = true;
            } else if (item.tick === tick) {
                result = (key !== undefined) && (item.key === key);
            } else {
                result = false;
            }
            if (result) {
                item.tick = tick;
                item.key = key;
            }
        } else {
            this.topObjects[groupName] = {
                tick: tick,
                key: key
            }
            result = true;
        }
        return result;
    }

    clear() {
        Clear(this.topObjects);
        return this;
    }
}

export default TouchGroup;