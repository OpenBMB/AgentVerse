import GetPageKey from './GetPageKeyByIndex.js';
import GetPageIndex from './GetPageIndexByKey.js';
import AddPage from './AddPage.js';
import SwapPageMethods from './SwapPageMethods.js';
import RemovePageMethods from './RemovePageMethods.js';
import GetPage from './GetPage.js';
import GetTab from './GetTab.js';

var methods = {
    getPageKey: GetPageKey,
    getPageIndex: GetPageIndex,
    addPage: AddPage,
    getPage: GetPage,
    getTab: GetTab,
}

Object.assign(
    methods,
    SwapPageMethods,
    RemovePageMethods

);

export default methods;