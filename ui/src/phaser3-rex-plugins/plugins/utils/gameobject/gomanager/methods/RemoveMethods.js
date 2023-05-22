export default {
    remove(name, ignoreFade) {
        if (!this.has(name)) {
            return this;
        }

        var bob = this.get(name);
        delete this.bobs[name];

        this.removedGOs.push(bob.gameObject);

        if (!ignoreFade) {
            this.fadeBob(
                bob,                  // bob
                undefined,            // fromValue
                0,                    // toValue
                function () {         // onComplete
                    bob.destroy();
                }
            )
        } else {
            bob.destroy();
        }

        return this;
    },

    removeAll() {
        var bobs = this.bobs;
        for (var name in bobs) {
            this.remove(name);
        }
        return this;
    },

    clear(destroyChild) {
        if (destroyChild === undefined) {
            destroyChild = true;
        }
        var bobs = this.bobs;
        for (var name in bobs) {
            if (destroyChild) {
                bobs[name].destroy();
            }
            delete bobs[name];
        }
        this.removedGOs.length = 0;
        return this;
    }
}