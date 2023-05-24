import { Selector } from '../../../nodes';

/*
```yaml
selector:
    children:
        - sequence
        - sequence
```
*/

var CreateSelectorNode = function (data) {
    return new Selector(data);
}

export default CreateSelectorNode;