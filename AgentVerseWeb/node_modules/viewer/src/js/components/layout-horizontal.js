/**
 * @fileoverview layout-horizontal component definition
 * @author lakenen
 */

/**
 * The horizontal layout
 */
Crocodoc.addComponent('layout-' + LAYOUT_HORIZONTAL, ['layout-paged'], function (scope, paged) {

    'use strict';

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    var util = scope.getUtility('common'),
        browser = scope.getUtility('browser');

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return paged.extend({

        /**
         * Calculate the numeric value for zoom 'auto' for this layout mode
         * @returns {float} The zoom value
         */
        calculateZoomAutoValue: function () {
            var state = this.state,
                fitWidth = this.calculateZoomValue(ZOOM_FIT_WIDTH),
                fitHeight = this.calculateZoomValue(ZOOM_FIT_HEIGHT);

            // landscape
            if (state.widestPage.actualWidth > state.tallestPage.actualHeight) {
                return Math.min(fitWidth, fitHeight);
            }
            // portrait
            else {
                if (browser.mobile) {
                    return fitHeight;
                }
                // limit max zoom to 1.0
                return Math.min(1, fitHeight);
            }
        },

        /**
         * Calculate which page is currently the "focused" page.
         * In horizontal mode, this is the page farthest to the left,
         * where at least half of the page is showing.
         * @returns {int} The current page
         */
        calculateCurrentPage: function () {
            var prev, page,
                state = this.state,
                pages = state.pages;

            prev = util.bisectRight(pages, state.scrollLeft, 'x0') - 1;
            page = util.bisectRight(pages, state.scrollLeft + pages[prev].width / 2, 'x0') - 1;
            return 1 + page;
        },

        /**
         * Calculates the next page
         * @returns {int} The next page number
         */
        calculateNextPage: function () {
            return this.state.currentPage + 1;
        },

        /**
         * Calculates the previous page
         * @returns {int} The previous page number
         */
        calculatePreviousPage: function () {
            return this.state.currentPage - 1;
        },

        /**
         * Handle resize mesages
         * @param   {Object} data The message data
         * @returns {void}
         */
        handleResize: function (data) {
            paged.handleResize.call(this, data);
            this.updateCurrentPage();
        },

        /**
         * Handle scroll mesages
         * @param   {Object} data The message data
         * @returns {void}
         */
        handleScroll: function (data) {
            paged.handleScroll.call(this, data);
            this.updateCurrentPage();
        },

        /**
         * Updates the layout elements (pages, doc, etc) CSS
         * appropriately for the current zoom level
         * @returns {void}
         */
        updateLayout: function () {
            var state = this.state,
                zoomState = state.zoomState,
                zoom = zoomState.zoom,
                zoomedWidth = state.sumWidths,
                zoomedHeight = Math.floor(state.tallestPage.totalActualHeight * zoom),
                docWidth = Math.max(zoomedWidth, state.viewportDimensions.clientWidth),
                docHeight = Math.max(zoomedHeight, state.viewportDimensions.clientHeight);

            this.$doc.css({
                height: docHeight,
                lineHeight: docHeight + 'px',
                width: docWidth
            });
        }
    });
});

