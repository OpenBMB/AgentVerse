import { GetParent, GetTopmostParent } from './GetParent.js';
import GetLocalState from './utils/GetLocalState.js';

export default {
    setParent(gameObject, parent) {
        if (parent === undefined) {
            parent = this;
        }
        var localState = GetLocalState(gameObject);
        if (parent) { // Add to parent
            localState.parent = parent;
            localState.self = gameObject;
        } else { // Remove from parent
            localState.parent = null;
            localState.self = null;
        }
        return this;
    },

    getParent(gameObject, name) {
        if (typeof (gameObject) === 'string') {
            name = gameObject;
            gameObject = undefined;
        }
        if (gameObject === undefined) {
            gameObject = this;
        }
        return GetParent(gameObject, name);
    },

    getTopmostParent(gameObject) {
        if (gameObject === undefined) {
            gameObject = this;
        }
        return GetTopmostParent(gameObject);
    }
};