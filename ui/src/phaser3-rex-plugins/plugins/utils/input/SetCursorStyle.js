var SetCursorStyle = function (scene, cursor) {
    if (cursor === undefined) {
        cursor = '';
    }
    scene.input.manager.canvas.style.cursor = cursor;
}

export default SetCursorStyle;