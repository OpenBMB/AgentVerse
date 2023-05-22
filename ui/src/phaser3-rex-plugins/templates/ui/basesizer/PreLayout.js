var PreLayout = function () {
    this._childrenWidth = undefined;
    this._childrenHeight = undefined;

    var children = this.getChildrenSizers(),
        child;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        if (child.ignoreLayout) {
            continue;
        }
        child.preLayout();
    }
}
export default PreLayout;