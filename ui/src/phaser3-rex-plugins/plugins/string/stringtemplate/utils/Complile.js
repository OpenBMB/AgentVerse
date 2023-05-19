import StringTemplate from '../StringTemplate.js';

var stringTemplate = new StringTemplate();
var Compile = function (content, config) {
    return stringTemplate.compile(content, config);
}

export default Compile;