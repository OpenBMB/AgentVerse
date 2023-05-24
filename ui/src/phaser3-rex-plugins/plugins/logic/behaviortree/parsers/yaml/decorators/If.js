import { If } from '../../../nodes';
import IsPlainObject from '../../../../../utils/object/IsPlainObject.js';

/*
```yaml
conditions:
    if: A > 10
    # if: {expression:'A > 10'}
```
*/

var CreateIfNode = function (data, child) {
    if (IsPlainObject(data)) {
        data.child = child;
    } else {
        data = {
            expression: data,
            child: child
        }
    }
    return new If(data);
}

export default CreateIfNode;