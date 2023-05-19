import GetChildrenWidth from './GetChildrenWidth.js';
import GetChildrenHeight from './GetChildrenHeight.js';
import GetChildrenSizers from './GetChildrenSizers.js';
import ResetChildPosition from './ResetChildPosition.js';
import LayoutChildren from './LayoutChildren.js';
import ChildrenMaskMethods from '../../../../plugins/gameobjects/container/containerlite/mask/ChildrenMaskMethods.js';

var methods = {
    getChildrenWidth: GetChildrenWidth,
    getChildrenHeight: GetChildrenHeight,
    getChildrenSizers: GetChildrenSizers,
    resetChildPosition: ResetChildPosition,
    layoutChildren: LayoutChildren
};

Object.assign(
    methods,
    ChildrenMaskMethods
);

export default methods;