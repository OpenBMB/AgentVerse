/**
 * @fileOverview The download plugin for the View API
 * @author lakenen
 */

Crocodoc.addPlugin('download', function (scope) {
    'use strict';

    /**
     * Initiate a download for the given URL
     * @param   {string} url The download URL
     * @returns {void}
     * @private
     */
    function download(url) {
        var a = document.createElement('a');
        a.href = url;
        a.setAttribute('download', 'doc');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    return {
        /**
         * Initialize the download plugin
         * @param   {Object} config     The config object
         * @param   {string} config.url The download URL
         * @returns {void}
         */
        init: function (config) {
            var url = config.url,
                viewerAPI = scope.getConfig().api;

            if (url) {
                viewerAPI.download = function () {
                    download(url);
                };
            }
        }
    };
});
