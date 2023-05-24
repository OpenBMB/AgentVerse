var GetTab = function (key) {
    var index;
    if (typeof (key) === 'number') {
        index = key;
    } else {
        index = this.getPageIndex(key);
    }
    return this.getElement('tabs.buttons')[index];
}

export default GetTab;