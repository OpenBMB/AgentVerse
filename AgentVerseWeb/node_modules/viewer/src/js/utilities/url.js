/**
 * @fileoverview url utility definition
 * @author lakenen
 */

/**
 * URL utility
 */
Crocodoc.addUtility('url', function (framework) {

    'use strict';

    var browser = framework.getUtility('browser'),
        parsedLocation;

    return {
        /**
         * Return the current page's URL
         * @returns {string} The current URL
         */
        getCurrentURL: function () {
            return window.location.href;
        },

        /**
         * Make the given path absolute
         *  - if path doesn't contain protocol and domain, prepend the current protocol and domain
         *  - if the path is relative (eg. doesn't begin with /), also fill in the current path
         * @param   {string} path The path to make absolute
         * @returns {string}      The absolute path
         */
        makeAbsolute: function (path) {
            return this.parse(path).href;
        },

        /**
         * Returns true if the given url is external to the current domain
         * @param   {string}  url The URL
         * @returns {Boolean} Whether or not the url is external
         */
        isCrossDomain: function (url) {
            var parsedURL = this.parse(url);

            if (!parsedLocation) {
                parsedLocation = this.parse(this.getCurrentURL());
            }

            // IE7 does not properly parse relative URLs, so the hostname is empty
            if (!parsedURL.hostname) {
                return false;
            }

            return parsedURL.protocol !== parsedLocation.protocol ||
                   parsedURL.hostname !== parsedLocation.hostname ||
                   parsedURL.port !== parsedLocation.port;
        },

        /**
         * Append a query parameters string to the given URL
         * @param   {string} url The URL
         * @param   {string} str The query parameters
         * @returns {string}     The new URL
         */
        appendQueryParams: function (url, str) {
            if (url.indexOf('?') > -1) {
                return url + '&' + str;
            } else {
                return url + '?' + str;
            }
        },

        /**
         * Parse a URL into protocol, host, port, etc
         * @param   {string} url The URL to parse
         * @returns {object}     The parsed URL parts
         */
        parse: function (url) {
            var parsed = document.createElement('a'),
                pathname;

            parsed.href = url;

            // @NOTE: IE does not automatically parse relative urls,
            // but requesting href back from the <a> element will return
            // an absolute URL, which can then be fed back in to get the
            // expected result. WTF? Yep!
            if (browser.ie && url !== parsed.href) {
                url = parsed.href;
                parsed.href = url;
            }

            // @NOTE: IE does not include the preceding '/' in pathname
            pathname = parsed.pathname;
            if (!/^\//.test(pathname)) {
                pathname = '/' + pathname;
            }

            return {
                href: parsed.href,
                protocol: parsed.protocol, // includes :
                host: parsed.host, // includes port
                hostname: parsed.hostname, // does not include port
                port: parsed.port,
                pathname: pathname,
                hash: parsed.hash,  // inclues #
                search: parsed.search // incudes ?
            };
        }
    };
});
