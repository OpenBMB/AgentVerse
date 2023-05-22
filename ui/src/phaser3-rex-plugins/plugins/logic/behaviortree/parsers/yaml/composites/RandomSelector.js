import { RandomSelector } from '../../../nodes';

/*
```yaml
random-selector:
    children:
        - sequence
        - sequence
```
*/

var CreateRandomSelectorNode = function (data) {
    return new RandomSelector(data);
}

export default CreateRandomSelectorNode;