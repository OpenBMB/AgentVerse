import LoadScriptPromise from '../../../utils/loader/LoadScriptPromise.js';

const VERSION = '2.11.0';
const CDNURL = `https://npmcdn.com/parse@${VERSION}/dist/parse.min.js`;

var Preload = function (url) {
    if (url === undefined) {
        url = CDNURL;
    }

    return LoadScriptPromise(url);
}

export default Preload;