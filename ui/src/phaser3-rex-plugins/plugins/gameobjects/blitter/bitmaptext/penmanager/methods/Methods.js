import RemovePenMethods from './RemovePenMethods.js';
import AddTextPens from './AddTextPens.js';
import SetTextPens from './SetTextPens.js';
import RunWordWrap from './runwordwrap/RunWordWrap.js';
import RunVerticalWrap from './runverticalwrap/RunVerticalWrap.js';

var Methods = {
    addTextPens: AddTextPens,
    setTextPens: SetTextPens,
    runWordWrap: RunWordWrap,
    runVerticalWrap: RunVerticalWrap,
}

Object.assign(
    Methods,
    RemovePenMethods
);

export default Methods;