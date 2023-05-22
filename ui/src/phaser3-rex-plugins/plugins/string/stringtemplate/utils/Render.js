import Compile from './Complile.js';

var Render = function (content, view, config) {
    var f;
    if (typeof (content) === 'string') {
        f = Compile(content, config);
    } else {
        f = content;
    }

    return f(view);
}

export default Render;