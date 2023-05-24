import { IfSelector } from '../../../nodes';

/*
```yaml
if-selector:
    expression: A > 10
    children:
        - seqence
        - seqence
```
*/

var CreateIfSelectorNode = function (data) {
    return new IfSelector(data);
}

export default CreateIfSelectorNode;