class ConditionsTable {
    constructor() {
        this.tests = [];  // [{name, function}, ...]
    }

    clear() {
        this.tests.length = 0;
        return this;
    }

    add(name, callback) {
        this.tests.push({
            name: name,
            function: callback
        });
        return this;
    }

    getTestResults(context) {
        var results = {};  // {name: boolean}
        var name, f;
        for (var i = 0, cnt = this.tests.length; i < cnt; i++) {
            name = this.tests[i].name;
            f = this.tests[i].function;

            if (f(context)) {
                results[name] = true;
            } else if (!results.hasOwnProperty(name)) {
                results[name] = false;
            }
        }

        return results;
    }

    anyPassTest(context, callback, scope) {
        var name, f;
        for (var i = 0, cnt = this.tests.length; i < cnt; i++) {
            name = this.tests[i].name;
            f = this.tests[i].function;
            if (!f(context)) {
                name = false;
                continue;
            }

            if (callback) {
                if (scope) {
                    callback.call(scope, name);
                } else {
                    callback(name);
                }
            }
            break;
        }

        return (callback) ? this : name;
    }

    eachPassTest(context, callback, scope) {
        var name, f;
        for (var i = 0, cnt = this.tests.length; i < cnt; i++) {
            name = this.tests[i].name;
            f = this.tests[i].function;
            if (!f(context)) {
                continue;
            }

            if (scope) {
                callback.call(scope, name);
            } else {
                callback(name);
            }
        }
        return this;
    }

    eachTest(context, callback, scope) {
        var pass, name, f;
        for (var i = 0, cnt = this.tests.length; i < cnt; i++) {
            name = this.tests[i].name;
            f = this.tests[i].function;
            pass = f(context);
            if (scope) {
                callback.call(scope, name, pass);
            } else {
                callback(name, pass);
            }
        }
        return this;
    }
}

export default ConditionsTable;