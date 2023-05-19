import { WeightSelector } from '../../../nodes';

/*
```yaml
weight-selector:
    children:
        - 
            weight: 2
            node: 
                sequence
        - seqence
```
*/

var CreateWeightSelectorNode = function (data) {
    return new WeightSelector(data);
}

export default CreateWeightSelectorNode;