/**
 * @fileoverview layout-presentation-two-page component definition
 * @author lakenen
 */

/**
 * The presentation-two-page layout
 */
Crocodoc.addComponent('layout-' + LAYOUT_PRESENTATION_TWO_PAGE, ['layout-' + LAYOUT_PRESENTATION], function (scope, presentation) {

    'use strict';

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    var util = scope.getUtility('common');

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return presentation.extend({
        /**
         * Initialize the presentation-two-page layout component
         * @returns {void}
         */
        init: function () {
            this.twoPageMode = true;
            presentation.init.call(this);
        },

        /**
         * Calculates the next page
         * @returns {int} The next page number
         */
        calculateNextPage: function () {
            return this.state.currentPage + 2;
        },

        /**
         * Calculates the previous page
         * @returns {int} The previous page number
         */
        calculatePreviousPage: function () {
            return this.state.currentPage - 2;
        },

        /**
         * Calculate the numeric value for a given zoom mode (or return the value if it's already numeric)
         * @param   {string} mode The mode to zoom to
         * @returns {float}       The zoom value
         */
        calculateZoomValue: function (mode) {
            var baseVal = presentation.calculateZoomValue.call(this, mode);
            if (mode === ZOOM_FIT_WIDTH) {
                baseVal /= 2;
            }
            return baseVal;
        },

        /**
         * Scroll to the given page number
         * @param   {int} page The page number to scroll to
         * @returns {void}
         */
        scrollToPage: function (page) {
            // pick the left page
            presentation.scrollToPage.call(this, page - (page + 1) % 2);
        },

        /**
         * Calculates the current range of pages that are visible
         * @returns {Object} Range object with min and max values
         */
        calculateVisibleRange: function () {
            var min = this.state.currentPage - 1,
                max = min + 1;
            return util.constrainRange(min, max, this.numPages);
        },

        /**
         * Calculates the current range of pages that are fully visible
         * @NOTE: this can be incorrect for presentations that are zoomed in
         * past the size of the viewport... I'll fix it if it becomes an issue
         * @returns {Object} Range object with min and max values
         */
        calculateFullyVisibleRange: function () {
            return this.calculateVisibleRange();
        }
    });
});
