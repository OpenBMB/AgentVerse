import Container from '../../container/Container.js';

const RemoveItem = Phaser.Utils.Array.Remove;
const ContainerRemove = Container.prototype.remove;

var RemoveChild = function (gameObject, destroyChild) {
    if (this.isBackground(gameObject)) {
        RemoveItem(this.backgroundChildren, gameObject);
    }
    ContainerRemove.call(this, gameObject, destroyChild);

    if (!destroyChild && this.sizerEventsEnable) {
        gameObject.emit('sizer.remove', gameObject, this);
        this.emit('remove', gameObject, this);
    }
    return this;
}

export default RemoveChild;