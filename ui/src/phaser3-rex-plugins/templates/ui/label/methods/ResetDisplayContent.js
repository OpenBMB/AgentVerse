var ResetDisplayContent = function (config) {
    if (config === undefined) {
        config = {};
    } else if (typeof (config) === 'string') {
        config = {
            text: config,
        }
    }

    var text = config.text || '';
    this.setText(text);

    var iconGameObjct = this.childrenMap.icon;
    if (iconGameObjct) {
        if (config.icon === undefined) {
            this.hide(iconGameObjct);
        } else {
            this.show(iconGameObjct);
        }
        var iconSize = config.iconSize;
        if (iconSize) {
            this.setChildDisplaySize(iconGameObjct, iconSize, iconSize);

            if (this.iconWidth !== undefined) {
                this.setIconSize(iconSize);
            }
        }
        this.setIconTexture(config.icon, config.iconFrame);
    }

    var actionGameObjct = this.childrenMap.action;
    if (actionGameObjct) {
        if (config.action === undefined) {
            this.hide(actionGameObjct);
        } else {
            this.show(actionGameObjct);
        }
        var actionSize = config.actionSize;
        if (actionSize) {
            this.setChildDisplaySize(actionGameObjct, actionSize, actionSize);

            if (this.actionWidth !== undefined) {
                this.setActionSize(actionSize);
            }

        }
        this.setActionTexture(config.action, config.actionFrame);
    }

    return this;
}

export default ResetDisplayContent;