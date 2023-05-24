import { Sequence } from '../../../nodes';

/*
```yaml
sequence:
    children:
        - sequence
        - sequence
```
*/

var CreateSequenceNode = function (data) {
    return new Sequence(data);
}

export default CreateSequenceNode;