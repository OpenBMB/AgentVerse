import { Cooldown } from '../../../nodes';
import IsPlainObject from '../../../../../utils/object/IsPlainObject.js';

/*
```yaml
conditions:
    cooldown: 1000
    # cooldown: {duration:1000}
```
*/

var CreateCooldownNode = function (data, child) {
    if (IsPlainObject(data)) {
        data.child = child;
    } else {
        data = {
            duration: data,
            child: child
        }
    }
    return new Cooldown(data);
}

export default CreateCooldownNode;