import GameObjectManagerMethods from '../../../../../utils/managers/GameObjectManagerMethods.js';
import OnParseAddGameObjectTag from './OnParseAddGameObjectTag.js';
import OnParseRemoveAllGameObjectsTag from './OnParseRemoveAllGameObjectsTag.js';
import OnParseCallGameObjectMethodTag from './OnParseCallGameObjectMethodTag.js';
import OnParseEaseGameObjectPropertyTag from './OnParseEaseGameObjectPropertyTag.js';

const ParseCallbacks = [
    OnParseAddGameObjectTag, OnParseRemoveAllGameObjectsTag,
    OnParseCallGameObjectMethodTag,
    OnParseEaseGameObjectPropertyTag
];

const AddGameObjectManager = GameObjectManagerMethods.addGameObjectManager;

export default {
    addGameObjectManager(config, GameObjectManagerClass) {
        if (config === undefined) {
            config = {};
        }
        var name = config.name;
        if (!name) {
            console.warn(`Parameter 'name' is required in TextPlayer.addGameObjectManager(config) method`);
        }

        AddGameObjectManager.call(this, config, GameObjectManagerClass);

        // Register parse callbacks
        var customParseCallbacks = config.parseCallbacks;
        if (!customParseCallbacks) {
            customParseCallbacks = ParseCallbacks;
        } else {
            customParseCallbacks = [
                ...customParseCallbacks, // customParseCallbacks have higher priority
                ...ParseCallbacks
            ];
        }
        for (var i = 0, cnt = customParseCallbacks.length; i < cnt; i++) {
            customParseCallbacks[i](this, this.parser, config);
        }

        return this;
    },
}