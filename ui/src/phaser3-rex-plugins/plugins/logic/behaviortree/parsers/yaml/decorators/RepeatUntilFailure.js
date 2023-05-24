import { RepeatUntilFailure } from '../../../nodes';
import IsPlainObject from '../../../../../utils/object/IsPlainObject.js';

/*
```yaml
conditions:
    repeat-until-false:
    # repeat-until-false: 3
    # repeat-until-false: {maxLoop:3}
```
*/

var CreateRepeatUntilFailureNode = function (data, child) {
    if (IsPlainObject(data)) {
        data.child = child;
    } else {
        data = {
            maxLoop: data,
            child: child
        }
    }
    return new RepeatUntilFailure(data);
}

export default CreateRepeatUntilFailureNode;