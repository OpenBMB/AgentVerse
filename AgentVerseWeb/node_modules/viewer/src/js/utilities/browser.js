/**
 * @fileOverview browser detection for use when feature detection won't work
 */

Crocodoc.addUtility('browser', function () {

    'use strict';

    var ua = navigator.userAgent,
        version,
        browser = {},
        ios = /ip(hone|od|ad)/i.test(ua),
        android = /android/i.test(ua),
        blackberry = /blackberry/i.test(ua),
        webos = /webos/i.test(ua),
        kindle = /silk|kindle/i.test(ua),
        ie = /MSIE|Trident/i.test(ua);

    if (ie) {
        browser.ie = true;
        if (/MSIE/i.test(ua)) {
            version = /MSIE\s+(\d+\.\d+)/i.exec(ua);
        } else {
            version = /Trident.*rv[ :](\d+\.\d+)/.exec(ua);
        }
        browser.version = version && parseFloat(version[1]);
        browser.ielt9 = browser.version < 9;
        browser.ielt10 = browser.version < 10;
        browser.ielt11 = browser.version < 11;
    }
    if (ios) {
        browser.ios = true;
        version = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
        browser.version = version && parseFloat(version[1] + '.' + version[2]);
    }
    browser.mobile = /mobile/i.test(ua) || ios || android || blackberry || webos || kindle;
    browser.firefox = /firefox/i.test(ua);
    if (/safari/i.test(ua)) {
        browser.chrome = /chrome/i.test(ua);
        browser.safari = !browser.chrome;
    }
    if (browser.safari) {
        version = (navigator.appVersion).match(/Version\/(\d+(\.\d+)?)/);
        browser.version = version && parseFloat(version[1]);
    }

    return browser;
});
