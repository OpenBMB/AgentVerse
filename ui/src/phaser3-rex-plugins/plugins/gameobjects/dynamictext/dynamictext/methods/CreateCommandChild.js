import { CmdTypeName } from '../bob/Types.js';
import Command from '../bob/command/Command.js';

var CreateCommandChild = function (name, callback, param, scope) {
    var child = this.poolManager.allocate(CmdTypeName);

    if (child === null) {
        child = new Command(
            this,               // parent
            name,
            callback, param, scope,
        );
    } else {
        child
            .setParent(this)
            .setActive()
            .setName(name)
            .setCallback(callback, scope)
            .setParameter(param)

    }

    return child;
}

export default CreateCommandChild;