import MergeStyle from './MergeStyle.js';
import ReplaceChildrenConfig from './ReplaceChildrenConfig.js';

var CreateAnySizer = function (scene, data, view, styles, customBuilders, SizerClass) {
    data = MergeStyle(data, styles);

    var backgroundConfig = ReplaceChildrenConfig(scene, data.background, view, styles, customBuilders);
    var childrenConfig = ReplaceChildrenConfig(scene, data.children, view, styles, customBuilders);

    var gameObject = new SizerClass(scene, data);
    scene.add.existing(gameObject);

    if (backgroundConfig) {
        for (var i = 0, cnt = backgroundConfig.length; i < cnt; i++) {
            var childConfig = backgroundConfig[i];
            gameObject.addBackground(childConfig.$child, childConfig.padding);
        }
    }

    if (childrenConfig) {
        for (var i = 0, cnt = childrenConfig.length; i < cnt; i++) {
            var childConfig = childrenConfig[i];
            gameObject.add(childConfig.$child, childConfig);
        }
    }

    return gameObject;
}

export default CreateAnySizer;