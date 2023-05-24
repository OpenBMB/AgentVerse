var CreateProxyContext = function (config, baseContext) {
    if (!config.hasOwnProperty('has')) {
        throw 'Need has(target, key):boolean handler';
    }
    if (!config.hasOwnProperty('get')) {
        throw 'Need get(target, key):any handler';
    }

    if (baseContext === undefined) {
        baseContext = {};
    }
    return new Proxy(baseContext, {
        has: config.has,
        get: config.get
    });
}

export default CreateProxyContext;