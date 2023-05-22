import IsEmpty from '../../../../utils/object/IsEmpty.js';
import GetPartialData from '../../../../utils/object/GetPartialData.js';
import IsKeyValueEqual from '../../../../utils/object/IsKeyValueEqual.js';

var RegisterCursorStyle = function (cursorStyle) {
    if (IsEmpty(cursorStyle)) {
        return;
    }

    this
        .setCursorStyle(cursorStyle)
        .on('cursorin', function (child) {
            var cursorStyle = this.cursorStyle;
            var styleSave = GetPartialData(child.style, cursorStyle);
            if (IsKeyValueEqual(cursorStyle, styleSave)) {
                return;
            }

            child.styleSave = styleSave;
            child.modifyStyle(cursorStyle);
        }, this)
        .on('cursorout', function (child) {
            if (!child.styleSave) {
                return;
            }

            child.modifyStyle(child.styleSave);
            child.styleSave = undefined;
        }, this)
}

export default RegisterCursorStyle;