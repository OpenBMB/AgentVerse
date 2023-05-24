import { Parallel } from '../../../nodes';

/*
```yaml
parallel:
    finishMode: 0
    children:
        - sequence
        - sequence
```
*/

var CreateParallelNode = function (data) {
    return new Parallel(data);
}

export default CreateParallelNode;