var Exit = function (parentContainer, rtOwner) {
    if (!parentContainer) {
        return false;
    }

    var visibleSibling = rtOwner.visibleSibling;
    // Set all visible children back
    for (var i = 0, cnt = visibleSibling.length; i < cnt; i++) {
        parentContainer.setChildVisible(visibleSibling[i], true);
    }
    visibleSibling.length = 0;

    // Set rtOwner to be invisible
    parentContainer.setChildVisible(rtOwner, false);

    rtOwner.isRunning = false;

    return true;
}

export default Exit;