import { SwitchSelector } from '../../../nodes';

/*
```yaml
switch-selector:
    expression: key
    children:
        A: seqence
        B: seqence
```
*/

var CreateSwitchSelectorNode = function (data) {
    return new SwitchSelector(data);
}

export default CreateSwitchSelectorNode;