/**
 * @fileoverview A standard data provider for metadata
 * @author lakenen
 */
Crocodoc.addDataProvider('metadata', function(scope) {
    'use strict';

    var ajax = scope.getUtility('ajax'),
        util = scope.getUtility('common'),
        config = scope.getConfig();

    /**
     * Process metadata json and return the result
     * @param   {string} json The original JSON text
     * @returns {string}      The processed JSON text
     * @private
     */
    function processJSONContent(json) {
        return util.parseJSON(json);
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        /**
         * Retrieve the info.json asset from the server
         * @returns {$.Promise} A promise with an additional abort() method that will abort the XHR request.
         */
        get: function() {
            var url = this.getURL(),
                $promise = ajax.fetch(url, Crocodoc.ASSET_REQUEST_RETRIES);

            // @NOTE: promise.then() creates a new promise, which does not copy
            // custom properties, so we need to create a futher promise and add
            // an object with the abort method as the new target
            return $promise.then(processJSONContent).promise({
                abort: $promise.abort
            });
        },

        /**
         * Build and return the URL to the metadata JSON
         * @returns {string}         The URL
         */
        getURL: function () {
            var jsonPath = config.template.json;
            return config.url + jsonPath + config.queryString;
        }
    };
});
