var ForEachFace = function (faces, callback, scope, ignoreInvalid) {
    if (Array.isArray(faces)) {
        var isBreak = false;
        for (var i = 0, cnt = faces.length; i < cnt; i++) {
            var face = faces[i];
            if (ignoreInvalid && !face) {
                continue;
            }
            if (scope) {
                isBreak = callback.call(scope, face, i, faces);
            } else {
                isBreak = callback(face, i, faces);
            }

            if (isBreak) {
                return;
            }
        }
    } else {
        var isBreak = false;
        for (var name in faces) {
            var face = faces[name];
            if (ignoreInvalid && !face) {
                continue;
            }
            if (scope) {
                isBreak = callback.call(scope, face, name, faces);
            } else {
                isBreak = callback(face, name, faces);
            }

            if (isBreak) {
                return;
            }
        }
    }
}

export default ForEachFace;