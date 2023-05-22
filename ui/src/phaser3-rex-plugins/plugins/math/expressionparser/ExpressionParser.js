import parser from './parser/parser.js';
import GetProperty from './GetProperty.js';

class FormulaParser extends parser.Parser {
    getProperty(context, name, defaultValue) {
        var value = GetProperty(context, name, undefined, false);
        if (value !== undefined) {
            return value;
        }
        return GetProperty(this, name, defaultValue, false);
    }

    getDotProperty(context, name, defaultValue) {
        var value = GetProperty(context, name, undefined, true);
        if (value !== undefined) {
            return value;
        }
        return GetProperty(this, name, defaultValue, true);
    }

    static GetProperty(context, key, defaultValue, dotMode) {
        return GetProperty(context, key, defaultValue, dotMode);
    }

    _add(a, b) {
        return a + b;
    }

    _subtract(a, b) {
        return a - b;
    }

    _multiply(a, b) {
        return a * b;
    }

    _divide(a, b) {
        return a / b;
    }

    _mod(a, b) {
        return a % b;
    }

    _pow(a, b) {
        return Math.pow(a, b);
    }

    _greaterThen(a, b) {
        return a > b;
    }

    _lessThen(a, b) {
        return a < b;
    }

    _equalTo(a, b) {
        return a == b;
    }

    _or(a, b) {
        return a || b;
    }

    _and(a, b) {
        return a && b;
    }

    defaultHandler(name, args) {
        return 0;
    }

    compile(input) {
        return this.parse(input);
    }

    exec(input, data) {
        if (typeof (input) === 'string') {
            input = this.compile(input);
        }
        return input(data);
    }
}

export default FormulaParser;