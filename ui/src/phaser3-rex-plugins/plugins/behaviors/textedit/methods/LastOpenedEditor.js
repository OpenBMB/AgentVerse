var LastOpenedEditor = undefined;

var SetLastOpenedEditor = function (editor) {
    if (editor === LastOpenedEditor) {
        return;
    }

    if (LastOpenedEditor !== undefined) {
        LastOpenedEditor.close();
    }

    LastOpenedEditor = editor;
}

var CloseLastOpenEditor = function (editor) {
    if (editor !== LastOpenedEditor) {
        return;
    }

    // Don't call `LastOpenedEditor.close()`
    LastOpenedEditor = undefined;
}

export {
    SetLastOpenedEditor,
    CloseLastOpenEditor
}