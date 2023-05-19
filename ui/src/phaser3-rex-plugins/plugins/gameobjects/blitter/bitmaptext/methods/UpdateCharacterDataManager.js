var UpdateCharacterDataManager = function (text, wrapMode, wrapWidth, lineHeight, characterDataManager) {
    if (characterDataManager === undefined) {
        characterDataManager = this.characterDataManager;
    }
    characterDataManager.clear();
    if (text === "") {
        return characterDataManager;
    }


}

export default UpdateCharacterDataManager;