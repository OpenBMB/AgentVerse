/**
 * @fileOverview Subpixel rendering fix for browsers that do not support subpixel rendering
 * @author lakenen
 */

/*global window, document*/
Crocodoc.addUtility('subpx', function (framework) {

    'use strict';

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    var CSS_CLASS_SUBPX_FIX = 'crocodoc-subpx-fix',
        TEST_SPAN_TEMPLATE = '<span style="font:{{size}}px serif; color:transparent; white-space:nowrap;">' +
            (new Array(100)).join('A') + '</span>'; // repeat 'A' character;

    var util = framework.getUtility('common');

    /**
     * Return true if subpixel rendering is supported
     * @returns {Boolean}
     * @private
     */
    function isSubpixelRenderingSupported() {
        // Test if subpixel rendering is supported
        // @NOTE: jQuery.support.leadingWhitespace is apparently false if browser is IE6-8
        if (!$.support.leadingWhitespace) {
            return false;
        } else {
            //span #1 - desired font-size: 12.5px
            var span = $(util.template(TEST_SPAN_TEMPLATE, { size: 12.5 }))
                .appendTo(document.documentElement).get(0);
            var fontsize1 = $(span).css('font-size');
            var width1 = $(span).width();
            $(span).remove();

            //span #2 - desired font-size: 12.6px
            span = $(util.template(TEST_SPAN_TEMPLATE, { size: 12.6 }))
                .appendTo(document.documentElement).get(0);
            var fontsize2 = $(span).css('font-size');
            var width2 = $(span).width();
            $(span).remove();

            // is not mobile device?
            // @NOTE(plai): Mobile WebKit supports subpixel rendering even though the browser fails the following tests.
            // @NOTE(plai): When modifying these tests, make sure that these tests will work even when the browser zoom is changed.
            // @TODO(plai): Find a better way of testing for mobile Safari.
            if (!('ontouchstart' in window)) {

                //font sizes are the same? (Chrome and Safari will fail this)
                if (fontsize1 === fontsize2) {
                    return false;
                }

                //widths are the same? (Firefox on Windows without GPU will fail this)
                if (width1 === width2) {
                    return false;
                }
            }
        }

        return true;
    }

    var subpixelRenderingIsSupported = isSubpixelRenderingSupported();

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        /**
         * Apply the subpixel rendering fix to the given element if necessary.
         * @NOTE: Fix is only applied if the "zoom" CSS property exists
         *        (ie., this fix is never applied in Firefox)
         * @param   {Element} el The element
         * @returns {Element} The element
         */
        fix: function (el) {
            if (!subpixelRenderingIsSupported) {
                if (document.body.style.zoom !== undefined) {
                    var $wrap = $('<div>').addClass(CSS_CLASS_SUBPX_FIX);
                    $(el).wrap($wrap);
                }
            }
            return el;
        },

        /**
         * Is sub-pixel text rendering supported?
         * @param   {void}
         * @returns {boolean} true if sub-pixel tex rendering is supported
         */
        isSubpxSupported: function() {
            return subpixelRenderingIsSupported;
        }
    };
});
