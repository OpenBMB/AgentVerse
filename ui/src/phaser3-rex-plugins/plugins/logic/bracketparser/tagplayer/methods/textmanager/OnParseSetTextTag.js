var OnParseSetTextTag = function (tagPlayer, parser, config) {
    var goType = config.name;
    var gameObjectManager = tagPlayer.getGameObjectManager(goType);

    // [goType.name.text] -> event : 'goType.text'    
    tagPlayer.on(`${goType}.text`, function (name) {
        // Clear text
        gameObjectManager.clearText(name);
        // Append text
        tagPlayer.setContentCallback(function (content) {
            gameObjectManager.appendText(name, content);
        });
    });
}

export default OnParseSetTextTag;