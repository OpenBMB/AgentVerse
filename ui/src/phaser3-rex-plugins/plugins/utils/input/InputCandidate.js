const RENDER_MASK = Phaser.GameObjects.GameObject.RENDER_MASK;

var InputCandidate = function (gameObject) {
    if (gameObject.renderFlags !== RENDER_MASK) {
        return false;
    }

    var visible = true;
    var parent = gameObject.parentContainer;

    if (parent) {
        do {
            if (parent.renderFlags !== RENDER_MASK) {
                visible = false;
                break;
            }

            parent = parent.parentContainer;

        } while (parent);
    }

    return visible;
}

export default InputCandidate;