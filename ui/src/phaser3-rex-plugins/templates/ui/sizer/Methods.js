import GetChildrenWidth from './GetChildrenWidth.js';
import GetChildrenHeight from './GetChildrenHeight.js';
import GetExpandedChildWidth from './GetExpandedChildWidth.js';
import GetExpandedChildHeight from './GetExpandedChildHeight.js';
import GetChildrenSizers from './GetChildrenSizers.js';
import PreLayout from './PreLayout.js';
import PostResolveSize from './PostResolveSize.js';
import LayoutChildren from './LayoutChildren.js';
import ResolveWidth from './ResolveWidth.js';
import ResolveHeight from './ResolveHeight.js';
import AddChildMethods from './AddChildMethods.js';
import RemoveChildMethods from './RemoveChildMethods.js';
import AlignMethods from './AlignMethods.js';
import ProportionMethods from './ProportionMethods.js';
import ExpandMethods from './ExpandMethods.js';

var methods = {
    getChildrenWidth: GetChildrenWidth,
    getChildrenHeight: GetChildrenHeight,
    getExpandedChildWidth: GetExpandedChildWidth,
    getExpandedChildHeight: GetExpandedChildHeight,
    getChildrenSizers: GetChildrenSizers,
    preLayout: PreLayout,
    postResolveSize: PostResolveSize,
    layoutChildren: LayoutChildren,
    resolveWidth: ResolveWidth,
    resolveHeight: ResolveHeight,
};

Object.assign(
    methods,
    AddChildMethods,
    RemoveChildMethods,
    AlignMethods,
    ProportionMethods,
    ExpandMethods,
);

export default methods;