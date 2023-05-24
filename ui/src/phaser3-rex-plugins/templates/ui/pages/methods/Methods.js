import AddChildMethods from './AddChildMethods.js';
import GetPage from './GetPage.js';
import SwapPage from './SwapPage.js';
import HasPage from './HasPage.js';

var methods = {
    getPage: GetPage,
    swapPage: SwapPage,
    hasPage: HasPage,
}

Object.assign(
    methods,
    AddChildMethods,
);

export default methods;