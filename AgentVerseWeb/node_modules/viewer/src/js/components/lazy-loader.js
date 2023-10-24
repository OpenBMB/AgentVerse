/**
 * @fileoverview lazy-loader component definition
 * @author lakenen
 */

/*global setTimeout, clearTimeout*/

/**
 * lazy-loader component for controlling when pages should be loaded and unloaded
 */
Crocodoc.addComponent('lazy-loader', function (scope) {

    'use strict';

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    var util = scope.getUtility('common'),
        browser = scope.getUtility('browser'),
        api = {},
        pages,
        numPages,
        pagefocusTriggerLoadingTID,
        readyTriggerLoadingTID,
        pageLoadTID,
        pageLoadQueue = [],
        pageLoadRange = 1,
        pageLoadingStopped = true,
        scrollDirection = 1,
        ready = false,
        layoutState = {
            page: 1,
            visiblePages: [1]
        };

    /**
     * Create and return a range object (eg., { min: x, max: y })
     * for the current pageLoadRange constrained to the number of pages
     * @param  {int} range The range from current page
     * @returns {Object}    The range object
     * @private
     */
    function calculateRange(range) {
        range = range || pageLoadRange;
        var currentIndex = layoutState.page - 1,
            low = currentIndex - range,
            high = currentIndex + range;
        return util.constrainRange(low, high, numPages - 1);
    }

    /**
     * Loop through the pageLoadQueue and load pages sequentially,
     * setting a timeout to run again after PAGE_LOAD_INTERVAL ms
     * until the queue is empty
     * @returns {void}
     * @private
     */
    function pageLoadLoop() {
        var index;
        clearTimeout(pageLoadTID);
        if (pageLoadQueue.length > 0) {
            // found a page to load
            index = pageLoadQueue.shift();
            // page exists and not reached max errors?
            if (pages[index]) {
                api.loadPage(index, function loadPageCallback(pageIsLoading) {
                    if (pageIsLoading === false) {
                        // don't wait if the page is not loading
                        pageLoadLoop();
                    } else {
                        pageLoadTID = setTimeout(pageLoadLoop, PAGE_LOAD_INTERVAL);
                    }
                });
            } else {
                pageLoadLoop();
            }
        } else {
            stopPageLoadLoop();
        }
    }

    /**
     * Start the page load loop
     * @returns {void}
     * @private
     */
    function startPageLoadLoop() {
        clearTimeout(pageLoadTID);
        pageLoadingStopped = false;
        pageLoadTID = setTimeout(pageLoadLoop, PAGE_LOAD_INTERVAL);
    }

    /**
     * Stop the page load loop
     * @returns {void}
     * @private
     */
    function stopPageLoadLoop() {
        clearTimeout(pageLoadTID);
        pageLoadingStopped = true;
    }

    /**
     * Add a page to the page load queue and start the page
     * load loop if necessary
     * @param  {int} index The index of the page to add
     * @returns {void}
     * @private
     */
    function pushPageLoadQueue(index) {
        pageLoadQueue.push(index);
        if (pageLoadingStopped) {
            startPageLoadLoop();
        }
    }

    /**
     * Clear all pages from the page load queue and stop the loop
     * @returns {void}
     * @private
     */
    function clearPageLoadQueue() {
        pageLoadQueue.length = 0;
        stopPageLoadLoop();
    }

    /**
     * Returns true if the given index is in the page load range, and false otherwise
     * @param   {int} index The page index
     * @param   {int} rangeLength The page range length
     * @returns {bool}      Whether the page index is in the page load range
     * @private
     */
    function indexInRange(index, rangeLength) {
        var range = calculateRange(rangeLength);
        if (index >= range.min && index <= range.max) {
            return true;
        }
        return false;
    }

    /**
     * Returns true if the given page index should be loaded, and false otherwise
     * @param   {int} index The page index
     * @returns {bool}      Whether the page should be loaded
     * @private
     */
    function shouldLoadPage(index) {
        var page = pages[index];

        // does the page exist?
        if (page) {

            // within page load range?
            if (indexInRange(index)) {
                return true;
            }

            // is it visible?
            if (pageIsVisible(index)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Returns true if the given page index should be unloaded, and false otherwise
     * @param   {int} index The page index
     * @param   {int} rangeLength The range length
     * @returns {bool}      Whether the page should be unloaded
     * @private
     */
    function shouldUnloadPage(index, rangeLength) {

        // within page load range?
        if (indexInRange(index, rangeLength)) {
            return false;
        }

        // is it visible?
        if (pageIsVisible(index)) {
            return false;
        }

        return true;
    }

    /**
     * Returns true if the given page is visible, and false otherwise
     * @param   {int} index The page index
     * @returns {bool}      Whether the page is visible
     * @private
     */
    function pageIsVisible(index) {
        // is it visible?
        return util.inArray(index + 1, layoutState.visiblePages) > -1;
    }

    /**
     * Queues pages to load in order from indexFrom to indexTo
     * @param   {number} start The page index to start at
     * @param   {number} end   The page index to end at
     * @returns {void}
     */
    function queuePagesToLoadInOrder(start, end) {
        var increment = util.sign(end - start);

        while (start !== end) {
            api.queuePageToLoad(start);
            start += increment;
        }
        api.queuePageToLoad(start);
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return util.extend(api, {
        messages: [
            'beforezoom',
            'pageavailable',
            'pagefocus',
            'ready',
            'scroll',
            'scrollend',
            'zoom'
        ],

        /**
         * Handle framework messages
         * @param {string} name The name of the message
         * @param {Object} data The related data for the message
         * @returns {void}
         */
        onmessage: function (name, data) {
            switch (name) {
                case 'beforezoom':
                    this.handleBeforeZoom(data);
                    break;
                case 'pageavailable':
                    this.handlePageAvailable(data);
                    break;
                case 'pagefocus':
                    this.handlePageFocus(data);
                    break;
                case 'ready':
                    this.handleReady();
                    break;
                case 'scroll':
                    this.handleScroll();
                    break;
                case 'scrollend':
                    this.handleScrollEnd();
                    break;
                case 'zoom':
                    this.handleZoom(data);
                    break;
                // no default
            }
        },

        /**
         * Initialize the LazyLoader component
         * @param {Array} pageComponents The array of page components to lazily load
         * @returns {void}
         */
        init: function (pageComponents) {
            pages = pageComponents;
            numPages = pages.length;
            pageLoadRange = (browser.mobile || browser.ielt10) ?
                MAX_PAGE_LOAD_RANGE_MOBILE :
                MAX_PAGE_LOAD_RANGE;
            pageLoadRange = Math.min(pageLoadRange, numPages);
        },

        /**
         * Destroy the LazyLoader component
         * @returns {void}
         */
        destroy: function () {
            this.cancelAllLoading();
        },

        /**
         * Updates the current layout state and scroll direction
         * @param   {Object} state The layout state
         * @returns {void}
         */
        updateLayoutState: function (state) {
            scrollDirection = util.sign(state.page - layoutState.page);
            layoutState = state;
        },

        /**
         * Queue pages to load in the following order:
         * 1) current page
         * 2) visible pages
         * 3) pages within pageLoadRange of the viewport
         * @returns {void}
         * @NOTE: this function is debounced so it will not load and abort
         * several times if called a lot in a short time
         */
        loadNecessaryPages: util.debounce(100, function () {
            // cancel anything that happens to be loading first
            this.cancelAllLoading();

            // load current page first
            this.queuePageToLoad(layoutState.page - 1);

            // then load pages that are visible in the viewport
            this.loadVisiblePages();

            // then load pages beyond the viewport
            this.loadPagesInRange(pageLoadRange);
        }),

        /**
         * Queue pages to load within the given range such that
         * proceeding pages are added before preceding pages
         * @param  {int} range The range to load beyond the current page
         * @returns {void}
         */
        loadPagesInRange: function (range) {
            var currentIndex = layoutState.page - 1;
            if (range > 0) {
                range = calculateRange(range);
                // load pages in the order of priority based on the direction
                // the user is scrolling (load nearest page first, working in
                // the scroll direction, then start on the opposite side of
                // scroll direction and work outward)
                // NOTE: we're assuming that a negative scroll direction means
                // direction of previous pages, and positive is next pages...
                if (scrollDirection >= 0) {
                    queuePagesToLoadInOrder(currentIndex + 1, range.max);
                    queuePagesToLoadInOrder(currentIndex - 1, range.min);
                } else {
                    queuePagesToLoadInOrder(currentIndex - 1, range.min);
                    queuePagesToLoadInOrder(currentIndex + 1, range.max);
                }
            }
        },

        /**
         * Queue to load all pages that are visible according
         * to the current layoutState
         * @returns {void}
         */
        loadVisiblePages: function () {
            var i, len;
            for (i = 0, len = layoutState.visiblePages.length; i < len; ++i) {
                this.queuePageToLoad(layoutState.visiblePages[i] - 1);
            }
        },

        /**
         * Add the page at the given index to the page load queue
         * and call the preload function on the page
         * @param  {int} index The index of the page to load
         * @returns {void}
         */
        queuePageToLoad: function (index) {
            if (shouldLoadPage(index)) {
                pages[index].preload();
                pushPageLoadQueue(index);
            }
        },

        /**
         * Clear the page load queue
         * @returns {void}
         */
        cancelAllLoading: function () {
            clearTimeout(readyTriggerLoadingTID);
            clearTimeout(pagefocusTriggerLoadingTID);
            clearPageLoadQueue();
        },

        /**
         * Call the load method on the page object at the specified index
         * @param  {int}      index    The index of the page to load
         * @param  {Function} callback Callback function to call always (regardless of page load success/fail)
         * @returns {void}
         */
        loadPage: function (index, callback) {
            $.when(pages[index] && pages[index].load())
                .always(callback);
        },

        /**
         * Call the unload method on the page object at the specified index
         * @param  {int} index The page index
         * @returns {void}
         */
        unloadPage: function (index) {
            var page = pages[index];
            if (page) {
                page.unload();
            }
        },

        /**
         * Unload all pages that are not within the given range (nor visible)
         * @param {int} rangeLength The page range length
         * @returns {void}
         */
        unloadUnnecessaryPages: function (rangeLength) {
            var i, l;
            // remove out-of-range SVG from DOM
            for (i = 0, l = pages.length; i < l; ++i) {
                if (shouldUnloadPage(i, rangeLength)) {
                    this.unloadPage(i);
                }
            }
        },

        /**
         * Handle ready messages
         * @returns {void}
         */
        handleReady: function () {
            ready = true;
            this.loadVisiblePages();
            readyTriggerLoadingTID = setTimeout(function () {
                api.loadNecessaryPages();
            }, READY_TRIGGER_PRELOADING_DELAY);
        },

        /**
         * Handle pageavailable messages
         * @param   {Object} data The message data
         * @returns {void}
         */
        handlePageAvailable: function (data) {
            if (!ready) {
                return;
            }
            var i;
            if (data.all === true) {
                data.upto = numPages;
            }
            if (data.page) {
                this.queuePageToLoad(data.page - 1);
            } else if (data.upto) {
                for (i = 0; i < data.upto; ++i) {
                    this.queuePageToLoad(i);
                }
            }
        },

        /**
         * Handle pagefocus messages
         * @param   {Object} data The message data
         * @returns {void}
         */
        handlePageFocus: function (data) {
            // NOTE: update layout state before `ready`
            this.updateLayoutState(data);
            if (!ready) {
                return;
            }
            this.cancelAllLoading();
            // set a timeout to trigger loading so we dont cause unnecessary layouts while scrolling
            pagefocusTriggerLoadingTID = setTimeout(function () {
                api.loadNecessaryPages();
            }, 200);
        },

        /**
         * Handle beforezoom messages
         * @param   {Object} data The message data
         * @returns {void}
         */
        handleBeforeZoom: function (data) {
            if (!ready) {
                return;
            }
            this.cancelAllLoading();
            // @NOTE: for performance reasons, we unload as many pages as possible just before zooming
            // so we don't have to layout as many pages at a time immediately after the zoom.
            // This is arbitrarily set to 2x the number of visible pages before the zoom, and
            // it seems to work alright.
            this.unloadUnnecessaryPages(data.visiblePages.length * 2);
        },

        /**
         * Handle zoom messages
         * @param   {Object} data The message data
         * @returns {void}
         */
        handleZoom: function (data) {
            // NOTE: update layout state before `ready`
            this.updateLayoutState(data);
            if (!ready) {
                return;
            }
            this.loadNecessaryPages();
        },

        /**
         * Handle scroll messages
         * @param   {Object} data The message data
         * @returns {void}
         */
        handleScroll: function () {
            this.cancelAllLoading();
        },

        /**
         * Handle scrollend messages
         * @param   {Object} data The message data
         * @returns {void}
         */
        handleScrollEnd: function () {
            if (!ready) {
                return;
            }
            this.loadNecessaryPages();
            this.unloadUnnecessaryPages(pageLoadRange);
        }
    });
});
