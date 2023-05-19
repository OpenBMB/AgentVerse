import Pool from '../../pool.js';

class ObjectPool extends Pool {
    shutdown() {
        var items = this.items,
            item;
        for (var i = 0, len = items.length; i < len; i++) {
            item = items[i];
            if (item.destroy) { // Assume that object has destroy function
                item.destroy();
            }
        }
        items.length = 0;
    }

    destroy() {
        this.shutdown();
    }
}

export default ObjectPool;