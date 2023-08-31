import SetTransitCallbackMethods from './SetTransitCallbackMethods.js';
import DelayCallMethods from './DelayCallMethods.js';
import ExpandSubMenu from './ExpandSubMenu.js';
import Collapse from './Collapse.js';
import CollapseSubMenu from './CollapseSubMenu.js';

var Methods = {
    expandSubMenu: ExpandSubMenu,
    collapse: Collapse,
    collapseSubMenu: CollapseSubMenu,
}

Object.assign(
    Methods,
    SetTransitCallbackMethods,
    DelayCallMethods
)
export default Methods;