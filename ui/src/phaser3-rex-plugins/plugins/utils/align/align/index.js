import AlignIn from './in/index.js';
import AlignTo from './to/index.js';
import CONST from './const.js';

var Align = {
    In: AlignIn,
    To: AlignTo
};

//   Merge in the consts
Object.assign(
    Align,
    CONST
);


export default Align;
