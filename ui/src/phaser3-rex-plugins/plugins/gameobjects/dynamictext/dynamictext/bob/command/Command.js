import Base from '../Base.js';
import { CmdTypeName } from '../Types.js';

class Command extends Base {
    constructor(parent, name, callback, param, scope) {
        super(parent, CmdTypeName);

        this
            .setName(name)
            .setParameter(param)
            .setCallback(callback, scope);
    }

    setName(name) {
        this.name = name;
        return this;
    }

    setParameter(param) {
        this.param = param;
        return this;
    }

    setCallback(callback, scope) {
        this.callback = callback;
        this.scope = scope;
        return this;
    }

    exec() {
        var result;
        if (this.scope) {
            result = this.callback.call(this.scope, this.param, this.name);
        } else {
            result = this.callback(this.param, this.name);
        }
        return result;
    }

    onFree() {
        super.onFree();
        this
            .setName()
            .setCallback()
            .setParameter()
    }
}

export default Command;