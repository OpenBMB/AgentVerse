/**
 * @fileoverview layout-vertical component definition
 * @author lakenen
 */

/**
 * The vertical layout
 */
Crocodoc.addComponent('layout-' + LAYOUT_VERTICAL, ['layout-paged'], function (scope, paged) {

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

            if (state.widestPage.actualWidth > state.tallestPage.actualHeight) {
                // landscape
                // max zoom 1 for vertical mode
                return Math.min(1, fitWidth, fitHeight);
            } else {
                // portrait
                if (browser.mobile) {
                    return fitWidth;
                }
                // limit max zoom to 100% of the doc
                return Math.min(1, fitWidth);
            }
        },

        /**
         * Calculate which page is currently the "focused" page.
         * In vertical mode, this is the page at the top (and if multiple columns, the leftmost page),
         * where at least half of the page is showing.
         * @returns {int} The current page
         */
        calculateCurrentPage: function () {
            var prevPageIndex,
                currentPageIndex,
                rowIndex,
                row,
                offset,
                state = this.state,
                pages = state.pages;

            prevPageIndex = util.bisectRight(pages, state.scrollTop, 'y0') - 1;
            if (prevPageIndex < 0) {
                return 1;
            }
            offset = state.scrollTop + pages[prevPageIndex].height / 2;
            currentPageIndex = util.bisectRight(pages, offset, 'y0') - 1;
            rowIndex = pages[currentPageIndex].rowIndex;
            row = state.rows[rowIndex];
            return 1 + row[0];

        },

        /**
         * Calculates the next page
         * @returns {int} The next page number
         */
        calculateNextPage: function () {
            var state = this.state,
                currentPage = state.pages[state.currentPage - 1],
                rowIndex = currentPage.rowIndex,
                nextRow = state.rows[rowIndex + 1];
            return nextRow && nextRow[0] + 1 || state.currentPage;
        },

        /**
         * Calculates the previous page
         * @returns {int} The previous page number
         */
        calculatePreviousPage: function () {
            var state = this.state,
                currentPage = state.pages[state.currentPage - 1],
                rowIndex = currentPage.rowIndex,
                prevRow = state.rows[rowIndex - 1];
            return prevRow && prevRow[0] + 1 || state.currentPage;
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
            // vertical stuff
            var state = this.state,
                zoom = state.zoomState.zoom,
                zoomedWidth,
                docWidth;

            zoomedWidth = Math.floor(state.widestPage.totalActualWidth * zoom);

            // use clientWidth for the doc (prevent scrollbar)
            // use width:auto when possible
            if (zoomedWidth <= state.viewportDimensions.clientWidth) {
                docWidth = 'auto';
            } else {
                docWidth = zoomedWidth;
            }

            this.$doc.css({
                width: docWidth
            });
        }
    });
});

