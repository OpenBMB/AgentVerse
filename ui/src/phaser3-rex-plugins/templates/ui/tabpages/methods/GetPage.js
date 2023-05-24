var GetPage = function (key) {
    if (typeof (key) === 'number') {
        key = this.getPageKey(key);
    }
    return this.childrenMap.pages.getPage(key);
}

export default GetPage;