var RemovePage = function (key, destroyChild) {
    if (typeof (key) === 'number') {
        key = this.getPageKey(key);
    }

    var tabs = this.childrenMap.tabs;
    var tabGameObject = tabs.getByName(key);
    var pages = this.childrenMap.pages;
    var pageGameObject = pages.getElement(key);
    if (!tabGameObject || !pageGameObject) {
        return this;
    }

    pages.removeChildrenMap(key);

    tabs.removeButton(tabGameObject, destroyChild);
    pages.remove(pageGameObject, destroyChild);

    return this;
}

export default {
    removePage: RemovePage,
};