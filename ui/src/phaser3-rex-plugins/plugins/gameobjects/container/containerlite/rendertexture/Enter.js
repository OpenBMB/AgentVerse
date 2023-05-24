import Exit from './Exit.js';
import Snapshot from '../../../../utils/rendertexture/Snapshot.js';

var Enter = function (parentContainer, rtOwner) {
    if (!parentContainer) {
        return false;
    }

    Exit(parentContainer, rtOwner);

    // Get and paste all visible children, which dose not include this render texture
    var useParentBounds = rtOwner.useParentBounds;
    Snapshot({
        gameObjects: parentContainer.getAllVisibleChildren(),
        renderTexture: rtOwner.rt,
        x: rtOwner.x,
        y: rtOwner.y,
        width: ((useParentBounds) ? parentContainer.displayWidth : undefined),
        height: ((useParentBounds) ? parentContainer.displayHeighth : undefined),
        originX: ((useParentBounds) ? parentContainer.originX : undefined),
        originY: ((useParentBounds) ? parentContainer.originY : undefined),
    });

    // Set rtOwner to be visible
    parentContainer.setChildVisible(rtOwner, true);

    // Set visible sibling to be invisible
    var visibleSibling = rtOwner.visibleSibling;
    var children = parentContainer.children;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        if ((child.visible) && (child !== rtOwner)) {
            parentContainer.setChildVisible(child, false);
            visibleSibling.push(child);
        }
    }

    rtOwner.isRunning = true;

    return true;
}

export default Enter;