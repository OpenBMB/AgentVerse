const GetValue = Phaser.Utils.Objects.GetValue;

var Init = function (parentContainer, rtOwner, config) {
    rtOwner.visibleSibling = [];
    rtOwner.isRunning = false;
    rtOwner.useParentBounds = GetValue(config, 'useParentBounds', false);

    rtOwner
        .setPosition(parentContainer.x, parentContainer.y)
        .setVisible(false)
    parentContainer.pin(rtOwner);
}

export default Init;