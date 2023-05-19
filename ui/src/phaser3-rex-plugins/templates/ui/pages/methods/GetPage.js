var GetPage = function (key) {
    if (key === undefined) {
        return null;
    } else if (!this.sizerChildren.hasOwnProperty(key)) {
        return null;
    } else {
        return this.sizerChildren[key];
    }
}
export default GetPage;