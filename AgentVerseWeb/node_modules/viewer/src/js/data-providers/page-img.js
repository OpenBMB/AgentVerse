/**
 * @fileoverview A standard data provider for page-img
 * @author lakenen
 */
Crocodoc.addDataProvider('page-img', function(scope) {
    'use strict';

    var util = scope.getUtility('common'),
        config = scope.getConfig();

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        /**
         * Retrieve the page image asset from the server
         * @param {string} objectType The type of data being requested
         * @param {number} pageNum The page number for which to request the page image
         * @returns {$.Promise}    A promise with an additional abort() method that will abort the img request.
         */
        get: function(objectType, pageNum) {
            var img = this.getImage(),
                retries = Crocodoc.ASSET_REQUEST_RETRIES,
                loaded = false,
                url = this.getURL(pageNum),
                $deferred = $.Deferred();

            function loadImage() {
                img.setAttribute('src', url);
            }

            function abortImage() {
                if (img) {
                    img.removeAttribute('src');
                }
            }

            // add load and error handlers
            img.onload = function () {
                loaded = true;
                $deferred.resolve(img);
            };

            img.onerror = function () {
                if (retries > 0) {
                    retries--;
                    abortImage();
                    loadImage();
                } else {
                    img = null;
                    loaded = false;
                    $deferred.reject({
                        error: 'image failed to load',
                        resource: url
                    });
                }
            };

            // load the image
            loadImage();

            return $deferred.promise({
                abort: function () {
                    if (!loaded) {
                        abortImage();
                        $deferred.reject();
                    }
                }
            });
        },

        /**
         * Build and return the URL to the PNG asset for the specified page
         * @param   {number} pageNum The page number
         * @returns {string}         The URL
         */
        getURL: function (pageNum) {
            var imgPath = util.template(config.template.img, { page: pageNum });
            return config.url + imgPath + config.queryString;
        },

        /**
         * Create and return a new image element (used for testing purporses)
         * @returns {Image}
         */
        getImage: function () {
            return new Image();
        }
    };
});
