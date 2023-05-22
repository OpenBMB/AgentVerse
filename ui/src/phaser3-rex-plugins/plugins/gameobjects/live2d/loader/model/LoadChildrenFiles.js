import CreateBinaryFile from './CreateBinaryFile.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;
const ImageFile = Phaser.Loader.FileTypes.ImageFile;

var LoadChildrenFiles = function (parent, setting) {
    var loader = parent.loader;
    var xhrSettings = GetFastValue(parent.config, 'xhrSettings');
    var key = parent.key;
    var homeDir = parent.homeDir;
    var requestUrls = [];  // Load a file one time

    // Load CubismModel
    var modelFileName = setting.getModelFileName();
    if (modelFileName !== '') {
        var requestUrl = `${homeDir}${modelFileName}`;
        if (requestUrls.indexOf(requestUrl) === -1) {
            var modelFile = CreateBinaryFile(
                loader,
                `${key}!${modelFileName}`,
                requestUrl,
                xhrSettings,
                'model'
            );

            parent.addToMultiFile(modelFile);
            loader.addFile(modelFile);

            requestUrls.push(requestUrl);
        }

    } else {
        // Error
        console.error(`Live2d: can't load model ${key}`);
        return;
    }

    // Load CubismExpression
    var cnt = setting.getExpressionCount();
    for (var i = 0; i < cnt; i++) {
        var expressionFileName = setting.getExpressionFileName(i);
        var expressionName = setting.getExpressionName(i);

        var requestUrl = `${homeDir}${expressionFileName}`;
        if (requestUrls.indexOf(requestUrl) === -1) {
            var expressionFile = CreateBinaryFile(
                loader,
                `${key}!${expressionFileName}`,
                requestUrl,
                xhrSettings,
                `expressions!!!${expressionName}`
            );

            parent.addToMultiFile(expressionFile);
            loader.addFile(expressionFile);

            requestUrls.push(requestUrl);
        }

    }

    // Load CubismPhysics
    var physicsFileName = setting.getPhysicsFileName();
    if (physicsFileName !== '') {
        var requestUrl = `${homeDir}${physicsFileName}`;
        if (requestUrls.indexOf(requestUrl) === -1) {
            var physicsFile = CreateBinaryFile(
                loader,
                `${key}!${physicsFileName}`,
                requestUrl,
                xhrSettings,
                'physics'
            );

            parent.addToMultiFile(physicsFile);
            loader.addFile(physicsFile);

            requestUrls.push(requestUrl);
        }

    }

    // Load CubismPose
    var poseFileName = setting.getPoseFileName();
    if (poseFileName !== '') {
        var requestUrl = `${homeDir}${poseFileName}`;
        if (requestUrls.indexOf(requestUrl) === -1) {
            var poseFile = CreateBinaryFile(
                loader,
                `${key}!${poseFileName}`,
                requestUrl,
                xhrSettings,
                'pose'
            );

            parent.addToMultiFile(poseFile);
            loader.addFile(poseFile);

            requestUrls.push(requestUrl);
        }

    }

    // Load UserData
    var userDataFileName = setting.getUserDataFile();
    if (userDataFileName !== '') {
        var requestUrl = `${homeDir}${userDataFileName}`;
        if (requestUrls.indexOf(requestUrl) === -1) {
            var userDataFile = CreateBinaryFile(
                loader,
                `${key}!${userDataFileName}`,
                requestUrl,
                xhrSettings,
                'userData'
            );

            parent.addToMultiFile(userDataFile);
            loader.addFile(userDataFile);

            requestUrls.push(requestUrl);
        }

    }

    // Load CubismMotion
    var groupCnt = setting.getMotionGroupCount();
    for (var gi = 0; gi < groupCnt; gi++) {
        var groupName = setting.getMotionGroupName(gi);
        var cnt = setting.getMotionCount(groupName);
        for (var i = 0; i < cnt; i++) {
            var motionFileName = setting.getMotionFileName(groupName, i);
            var requestUrl = `${homeDir}${motionFileName}`;
            if (requestUrls.indexOf(requestUrl) === -1) {
                var motionFile = CreateBinaryFile(
                    loader,
                    `${key}!${motionFileName}`,
                    requestUrl,
                    xhrSettings,
                    `motions!!!${groupName}!!!${i}`
                );

                parent.addToMultiFile(motionFile);
                loader.addFile(motionFile);

                requestUrls.push(requestUrl);
            }

        }

    }

    // Load texture
    var textureCnt = setting.getTextureCount();
    for (var i = 0; i < textureCnt; i++) {
        var textureFileName = setting.getTextureFileName(i);
        if (textureFileName === '') {
            // Error
            continue;
        }

        // TODO: store texture into live2d cache?
        var requestUrl = `${homeDir}${textureFileName}`;
        if (requestUrls.indexOf(requestUrl) === -1) {
            var imageFile = new ImageFile(
                loader,
                `${key}!${textureFileName}`,
                requestUrl,
                xhrSettings
            );
            imageFile.dataKey = `textures!!!${i}`;

            parent.addToMultiFile(imageFile);
            loader.addFile(imageFile);

            requestUrls.push(requestUrl);
        }

    }

}

export default LoadChildrenFiles;