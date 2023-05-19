import GetSizerConfig from './GetSizerConfig.js';
import GetChildPrevState from '../utils/GetChildPrevState.js';
import PushIntoBounds from './PushIntoBounds.js';
import DrawBounds from './DrawBounds.js';
import AddChildMethods from './AddChildMethods.js';
import RemoveChildMethods from './RemoveChildMethods.js';
import AddChildrenMap from './AddChildrenMap.js';
import RemoveChildrenMap from './RemoveChildrenMap.js';
import GetElement from './GetElement.js';
import PaddingMethods from './PaddingMethods.js';
import ResolveWidth from './ResolveWidth.js';
import ResolveChildrenWidth from './ResolveChildrenWidth.js';
import ResolveHeight from './ResolveHeight.js';
import PostResolveSize from './PostResolveSize.js';
import GetChildWidth from './GetChildWidth.js';
import GetChildHeight from './GetChildHeight.js';
import GetExpandedChildWidth from './GetExpandedChildWidth.js';
import GetExpandedChildHeight from './GetExpandedChildHeight.js';
import GetChildrenWidth from './GetChildrenWidth.js';
import GetChildrenHeight from './GetChildrenHeight.js';
import GetAllChildrenSizers from './GetAllChildrenSizers.js';
import GetChildrenSizers from './GetChildrenSizers.js';
import GetShownChildrenMethods from './GetShownChildrenMethods.js';
import PreLayout from './PreLayout.js';
import Layout from './Layout.js';
import RunLayout from './RunLayout.js';
import LayoutChildren from './LayoutChildren.js';
import PostLayout from './PostLayout.js';
import RunWidthWrap from './RunWidthWrap.js';

import SetAnchor from './SetAnchor.js';
import ScaleMethods from './ScaleMethods.js';
import FadeMethods from './FadeMethods.js';
import EaseMoveMethods from './EaseMoveMethods.js';
import ShakeMethods from './ShakeMethods.js';
import EaseDataMethods from './EaseDataMethods.js';
import HideMethods from './HideMethods.js';
import ModalMethods from './ModalMethods.js';
import IsInTouching from './IsInTouching.js';
import PointToChild from './PointToChild.js';
import GetParentSizerMethods from './GetParentSizerMethods.js';
import LayoutBackgrounds from './LayoutBackgrounds.js';
import SetDraggable from './SetDraggable.js';
import ClickMethods from './ClickMethods.js';
import ClickOutsideMethods from './ClickOutsideMethods.js';
import TouchingMethods from './TouchingMethods.js';
import SetChildrenInteractive from './SetChildrenInteractive.js';
import BroadcastEvent from './BroadcastEvent.js';

var methods = {
    getSizerConfig: GetSizerConfig,
    getChildPrevState: GetChildPrevState,
    pushIntoBounds: PushIntoBounds,
    drawBounds: DrawBounds,
    resolveWidth: ResolveWidth,
    resolveChildrenWidth: ResolveChildrenWidth,
    resolveHeight: ResolveHeight,
    postResolveSize: PostResolveSize,
    getChildWidth: GetChildWidth,
    getChildHeight: GetChildHeight,
    getExpandedChildWidth: GetExpandedChildWidth,
    getExpandedChildHeight: GetExpandedChildHeight,

    getChildrenWidth: GetChildrenWidth,
    getChildrenHeight: GetChildrenHeight,
    addChildrenMap: AddChildrenMap,
    addElement: AddChildrenMap,
    removeChildrenMap: RemoveChildrenMap,
    getElement: GetElement,
    getAllChildrenSizers: GetAllChildrenSizers,
    getChildrenSizers: GetChildrenSizers,
    preLayout: PreLayout,
    layout: Layout,
    runLayout: RunLayout,
    layoutChildren: LayoutChildren,
    runWidthWrap: RunWidthWrap,
    layoutBackgrounds: LayoutBackgrounds,
    postLayout: PostLayout,

    setAnchor: SetAnchor,
    isInTouching: IsInTouching,
    pointToChild: PointToChild,
    setDraggable: SetDraggable,
    setChildrenInteractive: SetChildrenInteractive,
    broadcastEvent: BroadcastEvent,

};

Object.assign(
    methods,
    PaddingMethods,
    AddChildMethods,
    RemoveChildMethods,
    GetParentSizerMethods,
    ScaleMethods,
    FadeMethods,
    EaseMoveMethods,
    ShakeMethods,
    EaseDataMethods,
    ClickMethods,
    ClickOutsideMethods,
    TouchingMethods,
    HideMethods,
    ModalMethods,
    GetShownChildrenMethods,
);

export default methods;