/**
 * @fileoverview layout-presentation component definition
 * @author lakenen
 */

/**
 *The presentation layout
 */
Crocodoc.addComponent('layout-' + LAYOUT_PRESENTATION, ['layout-paged'], function (scope, paged) {

    'use strict';

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    var util = scope.getUtility('common');

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return paged.extend({
        /**
         * Initialize the presentation layout component
         * @returns {void}
         */
        init: function () {
            paged.init.call(this);
            this.updatePageMargins();
            this.updatePageClasses();
        },

        /**
         * Destroy the component
         * @returns {void}
         */
        destroy: function () {
            paged.destroy.call(this);
            this.$pages.css({ margin: '', left: '' }).removeClass(PRESENTATION_CSS_CLASSES);
        },

        /**
         * Calculate the numeric value for zoom 'auto' for this layout mode
         * @returns {float} The zoom value
         */
        calculateZoomAutoValue: function () {
            var fitWidth = this.calculateZoomValue(ZOOM_FIT_WIDTH),
                fitHeight = this.calculateZoomValue(ZOOM_FIT_HEIGHT);
            return Math.min(fitWidth, fitHeight);
        },

        /**
         * Calculate which page is currently the "focused" page.
         * In presentation mode, it's just the state's current page.
         * @returns {int} The current page
         */
        calculateCurrentPage: function () {
            return this.state.currentPage;
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
         * Calculates the current range of pages that are visible
         * @returns {Object} Range object with min and max values
         */
        calculateVisibleRange: function () {
            var index = this.state.currentPage - 1;
            return util.constrainRange(index, index, this.numPages);
        },

        /**
         * Calculates the current range of pages that are fully visible
         * @NOTE: this can be incorrect for presentations that are zoomed in
         * past the size of the viewport... I'll fix it if it becomes an issue
         * @returns {Object} Range object with min and max values
         */
        calculateFullyVisibleRange: function () {
            return this.calculateVisibleRange();
        },

        /**
         * Set the current page and updatePageClasses
         * @param {int} page The page number
         */
        setCurrentPage: function (page) {
            var index = util.clamp(page - 1, 0, this.numPages),
                $precedingPage,
                $currentPage;

            paged.setCurrentPage.call(this, page);

            // update CSS classes
            this.$doc.find('.' + CSS_CLASS_PRECEDING_PAGE)
                .removeClass(CSS_CLASS_PRECEDING_PAGE);

            $precedingPage = this.$doc.find('.' + CSS_CLASS_CURRENT_PAGE);
            $currentPage = this.$pages.eq(index);

            if ($precedingPage[0] !== $currentPage[0]) {
                $precedingPage
                    .addClass(CSS_CLASS_PRECEDING_PAGE)
                    .removeClass(CSS_CLASS_CURRENT_PAGE);
                $currentPage.addClass(CSS_CLASS_CURRENT_PAGE);
            }

            this.updateVisiblePages(true);
            this.updatePageClasses(index);
        },

        /**
         * Scroll to the given page number
         * @param   {int} page The page number to scroll to
         * @returns {void}
         */
        scrollToPage: function (page) {
            this.setCurrentPage(page);
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
                page = this.currentPage || 1,
                currentPage = state.pages[page - 1],
                secondPage = this.twoPageMode ? state.pages[page] : currentPage,
                viewportWidth = state.viewportDimensions.clientWidth,
                viewportHeight = state.viewportDimensions.clientHeight,
                secondPageWidth,
                currentPageWidth,
                currentPageHeight,
                zoomedWidth, zoomedHeight,
                docWidth, docHeight;

            secondPageWidth = secondPage.actualWidth;
            currentPageWidth = currentPage.actualWidth + (this.twoPageMode ? secondPageWidth : 0);
            currentPageHeight = currentPage.actualHeight;

            zoomedWidth = Math.floor((currentPageWidth + currentPage.paddingLeft + secondPage.paddingRight) * zoom);
            zoomedHeight = Math.floor((currentPage.totalActualHeight) * zoom);

            docWidth = Math.max(zoomedWidth, viewportWidth);
            docHeight = Math.max(zoomedHeight, viewportHeight);

            this.$doc.css({
                width: docWidth,
                height: docHeight
            });

            this.updatePageMargins();

            if (docWidth > viewportWidth || docHeight > viewportHeight) {
                this.$el.addClass('crocodoc-scrollable');
            } else {
                this.$el.removeClass('crocodoc-scrollable');
            }
        },

        /**
         * Update page margins for the viewport size and zoom level
         * @returns {void}
         */
        updatePageMargins: function () {
            var i, len, page, $page,
                width, height, left, top, paddingH,
                state = this.state,
                viewportWidth = state.viewportDimensions.clientWidth,
                viewportHeight = state.viewportDimensions.clientHeight;
            // update pages so they are centered (preserving margins)
            for (i = 0, len = this.$pages.length; i < len; ++i) {
                $page = this.$pages.eq(i);
                page = state.pages[i];

                if (this.twoPageMode) {
                    paddingH = (i % 2 === 1) ? page.paddingRight : page.paddingLeft;
                } else {
                    paddingH = page.paddingRight + page.paddingLeft;
                }
                width = (page.actualWidth + paddingH) * state.zoomState.zoom;
                height = (page.actualHeight + page.paddingTop + page.paddingBottom) * state.zoomState.zoom;

                if (this.twoPageMode) {
                    left = Math.max(0, (viewportWidth - width * 2) / 2);
                    if (i % 2 === 1) {
                        left += width;
                    }
                } else {
                    left = (viewportWidth - width) / 2;
                }
                top = (viewportHeight - height) / 2;
                left = Math.max(left, 0);
                top = Math.max(top, 0);
                $page.css({
                    marginLeft: left,
                    marginTop: top
                });
            }
        },

        /**
         * Update page classes for presentation mode transitions
         * @returns {void}
         */
        updatePageClasses: function () {
            var $pages = this.$pages,
                index = this.state.currentPage - 1,
                next = index + 1,
                prev = index - 1,
                buffer = 20;

            // @TODO: optimize this a bit
            // add/removeClass is expensive, so try using hasClass
            $pages.removeClass(PRESENTATION_CSS_CLASSES);
            if (this.twoPageMode) {
                next = index + 2;
                prev = index - 2;
                $pages.slice(Math.max(prev, 0), index).addClass(CSS_CLASS_PAGE_PREV);
                $pages.slice(next, next + 2).addClass(CSS_CLASS_PAGE_NEXT);
            } else {
                if (prev >= 0) {
                    $pages.eq(prev).addClass(CSS_CLASS_PAGE_PREV);
                }
                if (next < this.numPages) {
                    $pages.eq(next).addClass(CSS_CLASS_PAGE_NEXT);
                }
            }
            $pages.slice(0, index).addClass(CSS_CLASS_PAGE_BEFORE);
            $pages.slice(Math.max(0, index - buffer), index).addClass(CSS_CLASS_PAGE_BEFORE_BUFFER);
            $pages.slice(next).addClass(CSS_CLASS_PAGE_AFTER);
            $pages.slice(next, Math.min(this.numPages, next + buffer)).addClass(CSS_CLASS_PAGE_AFTER_BUFFER);

            /*
            // OPTIMIZATION CODE NOT YET WORKING PROPERLY
            $pages.slice(0, index).each(function () {
                var $p = $(this),
                    i = $p.index(),
                    toAdd = '',
                    toRm = '';
                if (!$p.hasClass(beforeClass.trim())) toAdd += beforeClass;
                if ($p.hasClass(nextClass.trim())) toRm += nextClass;
                if ($p.hasClass(afterClass.trim())) toRm += afterClass;
                if ($p.hasClass(afterBufferClass.trim())) toRm += afterBufferClass;
                if (i >= index - buffer && !$p.hasClass(beforeBufferClass.trim()))
                    toAdd += beforeBufferClass;
                else if ($p.hasClass(beforeBufferClass.trim()))
                    toRm += beforeBufferClass;
                if (i >= prev && !$p.hasClass(prevClass.trim()))
                    toAdd += prevClass;
                else if ($p.hasClass(prevClass.trim()))
                    toRm += prevClass;
                $p.addClass(toAdd).removeClass(toRm);
//                console.log('before', $p.index(), toRm, toAdd);
            });
            $pages.slice(next).each(function () {
                var $p = $(this),
                    i = $p.index(),
                    toAdd = '',
                    toRm = '';
                if (!$p.hasClass(afterClass.trim())) toAdd += afterClass;
                if ($p.hasClass(prevClass.trim())) toRm += prevClass;
                if ($p.hasClass(beforeClass.trim())) toRm += beforeClass;
                if ($p.hasClass(beforeBufferClass.trim())) toRm += beforeBufferClass;
                if (i <= index + buffer && !$p.hasClass(afterBufferClass.trim()))
                    toAdd += afterBufferClass;
                else if ($p.hasClass(afterBufferClass.trim()))
                    toRm += afterBufferClass;
                if (i <= next + 1 && !$p.hasClass(nextClass.trim()))
                    toAdd += nextClass;
                else if ($p.hasClass(nextClass.trim()))
                    toRm += nextClass;
                $p.addClass(toAdd).removeClass(toRm);
//                console.log('after', $p.index(), toRm, toAdd);
            });*/
        }
    });
});
