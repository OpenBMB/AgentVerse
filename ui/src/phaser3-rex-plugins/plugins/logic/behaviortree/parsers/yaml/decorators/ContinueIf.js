import { ContinueIf } from '../../../nodes';
import IsPlainObject from '../../../../../utils/object/IsPlainObject.js';

/*
```yaml
conditions:
    continue-if: A > 10
    # abort-if: {expression:'A > 10', returnSuccess:true}
```
*/

var CreateContinueIfNode = function (data, child) {
    if (IsPlainObject(data)) {
        data.child = child;
    } else {
        data = {
            expression: data,
            child: child
        }
    }
    return new ContinueIf(data);
}

export default CreateContinueIfNode;