const VERSION = '7.19.0';

var GetDefaultUrl = function (version) {
    if (version === undefined) {
        version = VERSION
    }
    return {
        app: `https://www.gstatic.com/firebasejs/${version}/firebase-app.js`,

        // auth: `https://www.gstatic.com/firebasejs/${version}/firebase-auth.js`,
        database: `https://www.gstatic.com/firebasejs/${version}/firebase-database.js`,
        firestore: `https://www.gstatic.com/firebasejs/${version}/firebase-firestore.js`,
        // storage: `https://www.gstatic.com/firebasejs/${version}/firebase-storage.js`,

        // analytics: `https://www.gstatic.com/firebasejs/${version}/firebase-analytics.js`,
        // functions: `https://www.gstatic.com/firebasejs${version}/firebase-functions.js`,
        // messaging: `https://www.gstatic.com/firebasejs/${version}/firebase-messaging.js`,
        // performance: `https://www.gstatic.com/firebasejs/${version}/firebase-performance.js`,
        // 'remote-config': `https://www.gstatic.com/firebasejs/${version}/firebase-remote-config.js`
    }
}

export default GetDefaultUrl;
