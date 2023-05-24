import Drawer from '../bob/drawer/Drawer.js';
import { DrawerTypeName } from '../bob/Types.js';

var CreateDrawerChild = function (renderCallback, width, height) {
    var child = this.poolManager.allocate(DrawerTypeName);

    if (child === null) {
        child = new Drawer(
            this,               // parent
            renderCallback,
            width, height
        );
    } else {
        child
            .setParent(this)
            .setActive()
            .setRenderCallback(renderCallback)
            .setDrawerSize(width, height)
    }

    return child;
}
export default CreateDrawerChild;