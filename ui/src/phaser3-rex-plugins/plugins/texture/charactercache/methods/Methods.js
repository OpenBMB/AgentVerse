import Load from './Load.js';
import Unlock from './Unlock.js';
import GetAllData from './GetAllData.js';
import Clear from './Clear.js';
import BitmapTextMethods from './BitmapTextMethods.js';

var Methods = {
    load: Load,
    unlock: Unlock,
    getAllData: GetAllData,
    clear: Clear,
}

Object.assign(
    Methods,
    BitmapTextMethods
);


export default Methods;