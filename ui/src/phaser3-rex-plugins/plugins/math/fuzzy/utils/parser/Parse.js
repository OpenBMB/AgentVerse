import parser from './parser.js';

const Parser = new parser.Parser();
var Parse = function (input) {
    return Parser.parse(input);
}

export default Parse;