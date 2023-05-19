var CollapseSubMenu = function () {
    var subMenu = this.childrenMap.subMenu;
    if (subMenu === undefined) {
        return this;
    }
   
    this.childrenMap.subMenu = undefined;
    this.remove(subMenu);
    subMenu.collapse();
    return this;
}
export default CollapseSubMenu;