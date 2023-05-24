const GetValue = Phaser.Utils.Objects.GetValue;

var CreateCharacterItem = function (character) {
    return {
        character: character,
        freq: 0,
        alive: false,
        lock: false
    }
}

var GetChatacter = function (collection, character) {
    var item = collection.by('character', character);
    if (item === undefined) {
        item = CreateCharacterItem(character);
        collection.insert(item);
    }
    return item;
}

var GetInCacheCharacterItems = function (collection, config) {
    var excludeCharacters = GetValue(config, 'exclude', undefined);
    var lock = GetValue(config, 'lock', undefined);
    var freqMode = GetValue(config, 'freq', false);

    var filter = { alive: true };

    if (excludeCharacters !== undefined) {
        if (typeof (excludeCharacters) === 'string') {
            excludeCharacters = excludeCharacters.split();
        }
        filter.character = {
            $nin: excludeCharacters
        }
    }

    if (lock !== undefined) {
        filter.lock = lock;
    }

    if (freqMode) {
        return collection.chain().find(filter).simplesort('freq', { desc: true }).data();
    } else {
        return collection.chain().find(filter).data();
    }
}

var GetLockedCharacterItems = function (collection) {
    return collection.find({ lock: true });
}

var GetAllItems = function (collection, config) {
    var freqMode = GetValue(config, 'freq', true);

    if (freqMode) {
        return collection.chain().simplesort('freq', { desc: true }).data();
    } else {
        return collection.chain().data();
    }
}

export {
    GetChatacter,
    GetInCacheCharacterItems,
    GetLockedCharacterItems,
    GetAllItems,
}