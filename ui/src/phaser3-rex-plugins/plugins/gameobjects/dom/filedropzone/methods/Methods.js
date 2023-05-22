import Resize from '../../utils/Resize.js';
import SyncTo from '../../utils/SyncTo.js';
import LoadFileMethods from '../../utils/LoadFileMethods.js';
import DropEnableMethods from './DropEnableMethods.js';
import FilterMethods from './FilterMethods.js';

var Methods = {
    resize: Resize,
    syncTo: SyncTo,
}

Object.assign(
    Methods,
    DropEnableMethods,
    FilterMethods,
    LoadFileMethods,
)

export default Methods;