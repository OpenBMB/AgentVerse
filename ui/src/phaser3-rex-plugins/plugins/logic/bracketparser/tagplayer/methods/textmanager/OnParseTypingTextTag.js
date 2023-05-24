var OnParseTypingTextTag = function (tagPlayer, parser, config) {
    var goType = config.name;
    var gameObjectManager = tagPlayer.getGameObjectManager(goType);

    // [goType.name.typing] -> event : 'goType.typing'    
    tagPlayer.on(`${goType}.typing`, function (name, speed) {
        // Clear text
        gameObjectManager.clearTyping(name);
        // Append text
        tagPlayer.setContentCallback(function (content) {
            if (speed !== undefined) {
                gameObjectManager.setTypingSpeed(name, speed);
            }
            gameObjectManager.typing(name, content);
        });
    });
}

export default OnParseTypingTextTag;