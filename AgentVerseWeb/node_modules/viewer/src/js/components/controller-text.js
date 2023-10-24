/**
 * @fileoverview controller-text component
 * @author lakenen
 */

Crocodoc.addComponent('controller-text', function (scope) {

    'use strict';

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    var $promise;

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {

        /**
         * Initialize the controller
         * @returns {void}
         */
        init: function () {
            var config = scope.getConfig();
            config.$textContainer = $();

            // we can just load the text immediately
            $promise = scope.get('page-text', 1).then(function (html) {
                // the viewport could be window in useWindowAsViewport, so get
                // the real viewport div
                var $viewport = config.$doc.parent();
                config.$doc = $(html);
                $viewport.html(config.$doc);
            });
        },

        /**
         * Destroy the viewer-base component
         * @returns {void}
         */
        destroy: function () {
            $promise.abort();
        }
    };
});
