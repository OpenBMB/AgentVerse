import Clone from '../../utils/object/Clone.js';
import IsEmpty from '../../utils/object/IsEmpty.js';
import Clear from '../../utils/object/Clear.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Gashapon {
    constructor(config) {
        this.resetFromJSON(config);
    }

    destroy() {
        this.items = undefined;
        this.remainder = undefined;
        this._list = undefined;
    }

    resetFromJSON(o) {
        if (this.items == undefined) {
            this.items = {};
        }
        if (this.remainder == undefined) {
            this.remainder = {};
        }
        if (this._list == undefined) {
            this._list = [];
        }

        this.setMode(GetValue(o, 'mode', 0));
        this.setReload(GetValue(o, 'reload', true));
        this.setRND(GetValue(o, 'rnd', undefined));

        // data

        this.items = Clone(GetValue(o, 'items', {}), this.items);
        this._list.length = 0;

        // result
        this.result = GetValue(o, 'result', null);

        // flags
        this._restartFlag = true; // force restart to rebuild this._list

        // initialize
        if (this._restartFlag) {
            this.startGen();
        }
        var remainder = GetValue(o, 'remainder', undefined);
        if (remainder) {
            this.remainder = Clone(remainder, this.remainder);
        }

        return this;
    }

    toJSON() {
        return {
            // configuration
            mode: this.mode,
            reload: this.reload,
            rnd: this.rnd,

            // data
            items: Clone(this.items),
            remainder: Clone(this.remainder),

            // result
            result: this.result,

            // flags
            restart: true // force restart to rebuild this._list
        };
    };

    startGen() {
        var name;
        // clear remainder items
        for (name in this.remainder) {
            if (!this.items.hasOwnProperty(name)) {
                delete this.remainder[name];
            }
        }
        // init remainder items
        for (name in this.items) {
            var count = this.items[name];
            if (count > 0) {
                this.remainder[name] = count;
            }
        }

        if (this.mode === 1) { // random mode
            this.resetItemList(this.remainder);
        }
        this._restartFlag = false;

        return this;
    }

    setMode(m) {
        if (typeof (m) === 'string') {
            m = MODE[m];
        }
        this._restartFlag = (this.mode !== m);
        this.mode = m;
        return this;
    }

    setReload(isReload) {
        this.reload = !!isReload;
        return this;
    }

    setRND(rnd) {
        this.rnd = rnd;
        return this;
    }

    setItem(name, count) {
        this._restartFlag = (this.items[name] !== count);
        this.items[name] = count;
        return this;
    }

    removeItem(name) {
        if (this.items.hasOwnProperty(name)) {
            delete this.items[name];
            this._restartFlag = true;
        }
        return this;
    }

    removeAllItems() {
        for (var name in this.items) {
            delete this.items[name];
        }
        this._restartFlag = true;
        return this;
    }

    getItems() {
        return Clone(this.items);
    }

    getRemain() {
        return Clone(this.remainder);
    }

    getItemCount(name) {
        return this.items[name] || 0;
    }

    getRemainCount(name) {
        return this.remainder[name] || 0;
    }

    forEachItem(callback, scope) {
        var args = [null, undefined];

        for (var i = 2, len = arguments.length; i < len; i++) {
            args.push(arguments[i]);
        }
        for (var name in this.items) {
            args[0] = name;
            args[1] = this.items[name];

            if (scope) {
                callback.apply(scope, args);
            } else {
                callback(args);
            }

        }

        return this;
    }

    forEachRemain(callback, scope) {
        var args = [null, undefined];

        for (var i = 1; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        for (var name in this.remainder) {
            args[1] = name;
            args[2] = this.remainder[name];
            if (scope) {
                callback.apply(scope, args);
            } else {
                callback(args);
            }

        }

        return this;
    }

    addItem(name, count) {
        if (!this.items.hasOwnProperty(name)) {
            this.items[name] = 0;
        }
        this.items[name] += count;

        if (this._restartFlag)
            return;

        if (this.mode === 0) { // shuffle mode
            this.addRemainItem(name, count);
        } else { // random mode
            this.resetItemList(this.remainder);
        }
        return this;
    }

    putItemBack(name, count) {
        if (this.mode === 1) // random mode
            return;

        if (!this.items.hasOwnProperty(name)) {
            return;
        }

        if ((this.mode === 2) && this.restartGenFlg) {
            return;
        }

        // generator had started  
        if (!this.remainder.hasOwnProperty(name)) {
            this.remainder[name] = 0;
        }

        this.addShadowPattern(name, count, this.items[name]);
        return this;
    };

    next(name) {
        var result = null;
        if (this._restartFlag) {
            this.startGen();
        }

        if (name == null) {
            if (this.mode === 0) { // shuffle mode
                this.resetItemList(this.remainder);
                result = this.getRndItem(this._list);
                this.addRemainItem(result, -1);
            } else { // random mode
                result = this.getRndItem(this._list);
            }

        } else { // force pick
            if (!this.remainder.hasOwnProperty(name)) {
                result = null; // can not pick that result
            } else {
                if (this.mode === 0) {
                    this.addRemainItem(name, -1);
                }
                result = name;
            }
        }

        this.result = result;
        return result;
    }

    /** @private */
    resetItemList(items) {
        // clear list
        this._list.length = 0;
        var name, count, totalCount = 0;
        // get total count
        for (name in items) {
            count = items[name];
            if (count > 0)
                totalCount += count;
        }
        // set percentage
        for (name in items) {
            count = items[name];
            if (count > 0) {
                this._list.push([
                    name,
                    count / totalCount
                ]);
            }
        }
        return this;
    }

    /** @private */
    addRemainItem(name, inc, maxCount) {
        if ((name == null) || (inc === 0)) {
            return this;
        }

        if (!this.remainder.hasOwnProperty(name)) {
            this.remainder[name] = 0;
        }

        this.remainder[name] += inc;
        if ((maxCount != null) && (this.remainder[name] > maxCount)) {
            this.remainder[name] = maxCount
        }

        if (this.remainder[name] <= 0) {
            delete this.remainder[name];
        }

        if ((this.mode === 0) && this.reload && IsEmpty(this.remainder)) {
            this._restartFlag = true;
        }

        return this;
    }

    /** @private */
    getRndItem(list) {
        var value = (this.rnd) ? this.rnd.frac() : Math.random();
        var result = null,
            i, cnt = list.length,
            item
        for (i = 0; i < cnt; i++) {
            item = list[i];
            value -= item[1];
            if (value < 0) {
                result = item[0];
                break;
            }
        }
        return result;
    }

}

const MODE = {
    shuffle: 0,
    random: 1
};

export default Gashapon;