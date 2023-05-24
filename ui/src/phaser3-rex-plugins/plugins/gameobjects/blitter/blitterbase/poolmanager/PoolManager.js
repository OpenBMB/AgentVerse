import Pool from '../../../../pool.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var Pools = {};
class PoolManager {
    constructor(config) {
        this.pools = GetValue(config, 'pools', Pools);
    }

    destroy() {
        this.pools = undefined;
    }

    free(bob) {
        if (!this.pools) {
            return this;
        }

        var bobType = bob.type;
        if (!this.pools.hasOwnProperty(bobType)) {
            this.pools[bobType] = new Pool();
        }
        this.pools[bobType].push(bob);
        bob.onFree();
        return this;
    }

    freeMultiple(bobs) {
        if (!this.pools) {
            return this;
        }

        for (var i = 0, cnt = bobs.length; i < cnt; i++) {
            this.free(bobs[i]);
        }
        return this;
    }

    allocate(bobType) {
        if (!this.pools || !this.pools.hasOwnProperty(bobType)) {
            return null;
        }
        return this.pools[bobType].pop();
    }
}

export default PoolManager;