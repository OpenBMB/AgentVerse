import CreateChild from './CreateChild.js';

var ReplaceChildrenConfig = function (scene, childrenConfig, view, styles, customBuilders) {
    if (childrenConfig) {
        if (!Array.isArray(childrenConfig)) {
            childrenConfig = [childrenConfig];
        }

        for (var i = 0, cnt = childrenConfig.length; i < cnt; i++) {
            var childConfig = childrenConfig[i];
            if (!childConfig.$child) {
                childConfig = { $child: childConfig };
                childrenConfig[i] = childConfig;
            }
            CreateChild(scene, childConfig, '$child', view, styles, customBuilders);
        }
    }

    return childrenConfig;
}

export default ReplaceChildrenConfig;