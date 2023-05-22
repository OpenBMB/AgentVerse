import TextEdit from './TextEdit.js';

var Edit = function (gameObject, config, onCloseCallback) {
    if (!gameObject._edit) {
        gameObject._edit = new TextEdit(gameObject, {
            clickEnable: false
        });
    }
    gameObject._edit.open(config, onCloseCallback);
    return gameObject._edit;
}

export default Edit;