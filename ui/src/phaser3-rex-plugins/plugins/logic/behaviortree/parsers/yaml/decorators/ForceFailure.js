import { ForceFailure } from '../../../nodes';

/*
```yaml
conditions:
    force-false:
```
*/

var CreateForceFailureNode = function (data, child) {
    if (IsPlainObject(data)) {
        data.child = child;
    } else {
        data = {
            child: child
        }
    }
    return new ForceFailure(data);
}

export default CreateForceFailureNode;