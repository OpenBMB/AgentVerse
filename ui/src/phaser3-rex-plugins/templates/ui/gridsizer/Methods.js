import GetChildrenWidth from './GetChildrenWidth.js';
import GetChildrenHeight from './GetChildrenHeight.js';
import GetExpandedChildWidth from './GetExpandedChildWidth.js';
import GetExpandedChildHeight from './GetExpandedChildHeight.js';
import GetChildrenSizers from './GetChildrenSizers.js';
import PreLayout from './PreLayout.js';
import LayoutChildren from './LayoutChildren.js';
import ResolveWidth from './ResolveWidth.js';
import ResolveHeight from './ResolveHeight.js';
import ResolveChildrenWidth from './ResolveChildrenWidth.js';
import RunWidthWrap from './RunWidthWrap.js';
import AddChildMethods from './AddChildMethods.js';
import RemoveChildMethods from './RemoveChildMethods.js';
import ResetGrid from './ResetGrid.js';
import { InseryEmptyRow, AddEmptyRow } from './InsertEmptyRow.js';
import { InsertEmptyColumn, AddEmptyColumn } from './InsertEmptyColumn.js';


var methods = {
    getChildrenWidth: GetChildrenWidth,
    getChildrenHeight: GetChildrenHeight,
    getExpandedChildWidth: GetExpandedChildWidth,
    getExpandedChildHeight: GetExpandedChildHeight,
    getChildrenSizers: GetChildrenSizers,
    preLayout: PreLayout,
    layoutChildren: LayoutChildren,
    resolveWidth: ResolveWidth,
    resolveHeight: ResolveHeight,
    resolveChildrenWidth: ResolveChildrenWidth,
    runWidthWrap: RunWidthWrap,

    resetGrid: ResetGrid,
    inseryEmptyRow: InseryEmptyRow,
    addEmptyRow: AddEmptyRow,
    insertEmptyColumn: InsertEmptyColumn,
    addEmptyColumn: AddEmptyColumn,
};

Object.assign(
    methods,
    AddChildMethods,
    RemoveChildMethods
);

export default methods;