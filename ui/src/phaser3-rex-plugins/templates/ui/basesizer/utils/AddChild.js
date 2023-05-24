import Container from '../../container/Container.js';

const ContainerAdd = Container.prototype.add;

var AddChild = function (gameObject) {
    ContainerAdd.call(this, gameObject);

    if (this.sizerEventsEnable) {
        gameObject.emit('sizer.add', gameObject, this);
        this.emit('add', gameObject, this);
    }

    return this;
}

export default AddChild;