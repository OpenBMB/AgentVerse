import CreatePerspectiveObject from './CreatePerspectiveObject.js';

var CreateFaces = function (scene, config, faceNames) {
    var faces;
    if (faceNames === undefined) { // Return an array of faces
        faces = [];
        var face, faceConfig;
        for (var i = 0, cnt = config.length; i < cnt; i++) {
            faceConfig = config[i];
            if (faceConfig) {
                face = CreatePerspectiveObject(scene, faceConfig);
            } else {
                face = null;
            }
            faces.push(face);
        }
    } else { // Return a face map
        faces = {};
        var face, name;
        for (var i = 0, cnt = faceNames.length; i < cnt; i++) {
            name = faceNames[i];
            if (config.hasOwnProperty(name)) {
                face = CreatePerspectiveObject(scene, config[name]);
            } else {
                face = null;
            }

            faces[name] = face;
        }
    }

    return faces;
}

export default CreateFaces;