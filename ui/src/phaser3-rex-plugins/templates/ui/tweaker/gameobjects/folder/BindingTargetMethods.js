export default {
    setBindingTarget(target) {
        var child = this.childrenMap.child;  // tweaker
        child.setBindingTarget(target);
        return this;
    },
}