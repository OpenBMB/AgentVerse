/**
 * @fileoverview A standard data provider for page-svg
 * @author nsilva
 * @author lakenen
 */
Crocodoc.addDataProvider('page-svg', function(scope) {
    'use strict';

    var MAX_DATA_URLS = 1000;

    var util = scope.getUtility('common'),
        ajax = scope.getUtility('ajax'),
        browser = scope.getUtility('browser'),
        subpx = scope.getUtility('subpx'),
        config = scope.getConfig(),
        destroyed = false,
        cache = {},
        // NOTE: there are cases where the stylesheet link tag will be self-
        // closing, so check for both cases
        inlineCSSRegExp = /<xhtml:link[^>]*>(\s*<\/xhtml:link>)?/i;

    /**
     * Interpolate CSS text into the SVG text
     * @param   {string} text    The SVG text
     * @param   {string} cssText The CSS text
     * @returns {string}         The full SVG text
     */
    function interpolateCSSText(text, cssText) {
        // CSS text
        var stylesheetHTML = '<style>' + cssText + '</style>';

        // If using Firefox with no subpx support, add "text-rendering" CSS.
        // @NOTE(plai): We are not adding this to Chrome because Chrome supports "textLength"
        // on tspans and because the "text-rendering" property slows Chrome down significantly.
        // In Firefox, we're waiting on this bug: https://bugzilla.mozilla.org/show_bug.cgi?id=890692
        // @TODO: Use feature detection instead (textLength)
        if (browser.firefox && !subpx.isSubpxSupported()) {
            stylesheetHTML += '<style>text { text-rendering: geometricPrecision; }</style>';
        }

        // inline the CSS!
        text = text.replace(inlineCSSRegExp, stylesheetHTML);

        return text;
    }

    /**
     * Process SVG text and return the embeddable result
     * @param   {string} text The original SVG text
     * @returns {string}      The processed SVG text
     * @private
     */
    function processSVGContent(text) {
        if (destroyed) {
            return;
        }

        var query = config.queryString.replace('&', '&#38;'),
            dataUrlCount;

        dataUrlCount = util.countInStr(text, 'xlink:href="data:image');
        // remove data:urls from the SVG content if the number exceeds MAX_DATA_URLS
        if (dataUrlCount > MAX_DATA_URLS) {
            // remove all data:url images that are smaller than 5KB
            text = text.replace(/<image[\s\w-_="]*xlink:href="data:image\/[^"]{0,5120}"[^>]*>/ig, '');
        }

        // @TODO: remove this, because we no longer use any external assets in this way
        // modify external asset urls for absolute path
        text = text.replace(/href="([^"#:]*)"/g, function (match, group) {
            return 'href="' + config.url + group + query + '"';
        });

        return scope.get('stylesheet').then(function (cssText) {
            return interpolateCSSText(text, cssText);
        });
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        /**
         * Retrieve a SVG asset from the server
         * @param {string} objectType The type of data being requested
         * @param {number} pageNum The page number for which to request the SVG
         * @returns {$.Promise}    A promise with an additional abort() method that will abort the XHR request.
         */
        get: function(objectType, pageNum) {
            var url = this.getURL(pageNum),
                $promise;

            if (cache[pageNum]) {
                return cache[pageNum];
            }

            $promise = ajax.fetch(url, Crocodoc.ASSET_REQUEST_RETRIES);

            // @NOTE: promise.then() creates a new promise, which does not copy
            // custom properties, so we need to create a futher promise and add
            // an object with the abort method as the new target
            cache[pageNum] = $promise.then(processSVGContent).promise({
                abort: function () {
                    $promise.abort();
                    if (cache) {
                        delete cache[pageNum];
                    }
                }
            });
            return cache[pageNum];
        },

        /**
         * Build and return the URL to the SVG asset for the specified page
         * @param   {number} pageNum The page number
         * @returns {string}         The URL
         */
        getURL: function (pageNum) {
            var svgPath = util.template(config.template.svg, { page: pageNum });
            return config.url + svgPath + config.queryString;
        },

        /**
         * Cleanup the data-provider
         * @returns {void}
         */
        destroy: function () {
            destroyed = true;
            util = ajax = subpx = browser = config = cache = null;
        }
    };
});
