var GetPageIndexByKey = function (key) {
    var buttons = this.getElement('tabs.buttons');
    for (var i = 0, cnt = buttons.length; i < cnt; i++) {
        if (buttons[i].name === key) {
            return i;
        }
    }

    return undefined;
}

export default GetPageIndexByKey;