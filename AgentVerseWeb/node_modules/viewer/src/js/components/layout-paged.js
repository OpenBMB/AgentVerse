/**
 * @fileoverview layout-base component definition
 * @author lakenen
 */

/**
 * Base layout component for controlling viewer layout and viewport
 */
Crocodoc.addComponent('layout-paged', ['layout-base'], function (scope, base) {

    'use strict';

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    var util = scope.getUtility('common'),
        support = scope.getUtility('support');

    /**
     * Apply a zoom transform to the layout using width/height
     * (using width/height instead)
     * @param   {float} zoom The zoom value
     * @returns {void}
     * @private
     */
    function applyZoomResize(layout, zoom) {
        // manually resize pages width/height
        var i, len, pageState, cssRule,
            state = layout.state,
            selector = '.' + layout.config.namespace + ' .' + CSS_CLASS_PAGE_AUTOSCALE,
            stylesheet = layout.config.stylesheet,
            pages = state.pages,
            scale = zoom * layout.config.pageScale,
            percent = 100 / scale;

        // apply css transform or zoom to autoscale layer (eg., text, links, user content)
        if (support.csstransform) {
            cssRule = support.csstransform + ':scale(' + scale + ');' +
                'width:' + percent + '%;' +
                'height:' + percent + '%;';
        } else if (support.csszoom) {
            cssRule = 'zoom:' + scale;
        } else {
            // should not happen...
            cssRule = '';
        }

        // remove the previous style if there is one
        if (state.previousStyleIndex) {
            util.deleteCSSRule(stylesheet, state.previousStyleIndex);
        }
        // create a new rule for the autoscale layer
        state.previousStyleIndex = util.appendCSSRule(stylesheet, selector, cssRule);

        // update width/height/padding on all pages
        for (i = 0, len = pages.length; i < len; ++i) {
            pageState = pages[i];
            layout.$pages.eq(i).css({
                width: pageState.actualWidth * zoom,
                height: pageState.actualHeight * zoom,
                paddingTop: pageState.paddingTop * zoom,
                paddingRight: pageState.paddingRight * zoom,
                paddingBottom: pageState.paddingBottom * zoom,
                paddingLeft: pageState.paddingLeft * zoom
            });
        }
    }

    /**
     * Get the maximum y1 value for pages in the current row
     * (or Infinity if there are no pages in the current row yet)
     * @param {Array} pages Array of pages to search
     * @param {Array} row   Array of page indexes (i.e., the row)
     * @returns {number} The max y1 value
     * @private
     */
    function getMaxY1InRow(pages, row) {
        if (!row || row.length === 0) {
            return Infinity;
        }
        var y1s = util.map(row, function (pageIndex) {
            return pages[pageIndex].y1;
        });
        return Math.max.apply(Math, y1s);
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return base.extend({

        /**
         * Initialize the Layout component
         * @returns {void}
         */
        init: function () {
            base.init.call(this);
            this.updatePageStates();
            this.updateZoomLevels();
        },

        /**
         * Initalize the state object
         * @returns {void}
         */
        initState: function () {
            base.initState.call(this);
            util.extend(this.state, {
                pages: [],
                widestPage: {
                    index: 0,
                    actualWidth: 0
                },
                tallestPage: {
                    index: 0,
                    actualHeight: 0
                },
                sumWidths: 0,
                sumHeights: 0,
                rows: [],
                currentPage: null,
                visiblePages: [],
                fullyVisiblePages: []
            });
        },

        /**
         * Destroy the Layout component
         * @returns {void}
         */
        destroy: function () {
            base.destroy.call(this);
            this.$pages.css('padding', '');
        },

        /**
         * Force a full layout update
         */
        update: function () {
            this.updatePageStates(true);
            this.setZoom();
        },

        /**
         * Set the zoom level for the layout
         * @param {float|string} val The zoom level (float or one of the zoom constants)
         */
        setZoom: function (val) {
            var state = this.state,
                zoom = this.parseZoomValue(val),
                zoomState = state.zoomState,
                currentZoom = zoomState.zoom,
                zoomMode,
                shouldNotCenter;

            // update the zoom mode if we landed on a named mode
            zoomMode = this.calculateZoomMode(val, zoom);

            //respect zoom constraints
            zoom = util.clamp(zoom, state.minZoom, state.maxZoom);

            scope.broadcast('beforezoom', util.extend({
                page: state.currentPage,
                visiblePages: util.extend([], state.visiblePages),
                fullyVisiblePages: util.extend([], state.fullyVisiblePages)
            }, zoomState));

            // update the zoom state
            zoomState.prevZoom = currentZoom;
            zoomState.zoom = zoom;
            zoomState.zoomMode = zoomMode;

            // apply the zoom to the actual DOM element(s)
            this.applyZoom(zoom);

            // can the document be zoomed in/out further?
            zoomState.canZoomIn = this.calculateNextZoomLevel(Crocodoc.ZOOM_IN) !== false;
            zoomState.canZoomOut = this.calculateNextZoomLevel(Crocodoc.ZOOM_OUT) !== false;

            // update page states, because they will have changed after zooming
            this.updatePageStates();

            // layout mode specific stuff
            this.updateLayout();

            // update scroll position for the new zoom
            // @NOTE: updateScrollPosition() must be called AFTER updateLayout(),
            // because the scrollable space may change in updateLayout
            // @NOTE: shouldNotCenter is true when using a named zoom level
            // so that resizing the browser zooms to the current page offset
            // rather than to the center like when zooming in/out
            shouldNotCenter = val === Crocodoc.ZOOM_AUTO ||
                              val === Crocodoc.ZOOM_FIT_WIDTH ||
                              val === Crocodoc.ZOOM_FIT_HEIGHT;
            this.updateScrollPosition(shouldNotCenter);

            // update again, because updateLayout could have changed page positions
            this.updatePageStates();

            // make sure the visible pages are accurate (also update css classes)
            this.updateVisiblePages(true);

            // broadcast zoom event with new zoom state
            scope.broadcast('zoom', util.extend({
                page: state.currentPage,
                visiblePages: util.extend([], state.visiblePages),
                fullyVisiblePages: util.extend([], state.fullyVisiblePages),
                isDraggable: this.isDraggable()
            }, zoomState));
        },

        /**
         * Parse the given zoom value into a number to zoom to.
         * @param   {float|string} val The zoom level (float or one of the zoom constants)
         * @returns {float} The parsed zoom level
         */
        parseZoomValue: function (val) {
            var zoomVal = parseFloat(val),
                state = this.state,
                zoomState = state.zoomState,
                currentZoom = zoomState.zoom,
                nextZoom = currentZoom;

            // number
            if (zoomVal) {
                nextZoom = zoomVal;
            } else {
                switch (val) {
                    case Crocodoc.ZOOM_FIT_WIDTH:
                        // falls through
                    case Crocodoc.ZOOM_FIT_HEIGHT:
                        // falls through
                    case Crocodoc.ZOOM_AUTO:
                        nextZoom = this.calculateZoomValue(val);
                        break;

                    case Crocodoc.ZOOM_IN:
                        // falls through
                    case Crocodoc.ZOOM_OUT:
                        nextZoom = this.calculateNextZoomLevel(val) || currentZoom;
                        break;

                    // bad mode or no value
                    default:
                        // if there hasn't been a zoom set yet
                        if (!currentZoom) {
                            //use default zoom
                            nextZoom = this.calculateZoomValue(this.config.zoom || Crocodoc.ZOOM_AUTO);
                        }
                        else if (zoomState.zoomMode) {
                            //adjust zoom
                            nextZoom = this.calculateZoomValue(zoomState.zoomMode);
                        } else {
                            nextZoom = currentZoom;
                        }
                        break;
                }
            }

            return nextZoom;
        },

        /**
         * Calculates the new zoomMode given the input val and the parsed zoom value
         * @param   {float|string} val  The input zoom value
         * @param   {float} parsedZoom  The parsed zoom value
         * @returns {string|null}       The new zoom move
         */
        calculateZoomMode: function (val, parsedZoom) {
            // check if we landed on a named mode
            switch (parsedZoom) {
                case this.calculateZoomValue(Crocodoc.ZOOM_AUTO):
                    // if the value passed is a named zoom mode, use that, because
                    // fitheight and fitwidth can sometimes clash with auto (else use auto)
                    if (typeof val === 'string' &&
                        (val === Crocodoc.ZOOM_FIT_WIDTH || val === Crocodoc.ZOOM_FIT_HEIGHT))
                    {
                        return val;
                    }
                    return Crocodoc.ZOOM_AUTO;
                case this.calculateZoomValue(Crocodoc.ZOOM_FIT_WIDTH):
                    return Crocodoc.ZOOM_FIT_WIDTH;
                case this.calculateZoomValue(Crocodoc.ZOOM_FIT_HEIGHT):
                    return Crocodoc.ZOOM_FIT_HEIGHT;
                default:
                    return null;
            }
        },

        /**
         * Update zoom levels and the min and max zoom
         * @returns {void}
         */
        updateZoomLevels: function () {
            var i, lastZoomLevel,
                zoomLevels = this.config.zoomLevels.slice() || [1],
                auto = this.calculateZoomValue(Crocodoc.ZOOM_AUTO),
                fitWidth = this.calculateZoomValue(Crocodoc.ZOOM_FIT_WIDTH),
                fitHeight = this.calculateZoomValue(Crocodoc.ZOOM_FIT_HEIGHT),
                presets = [fitWidth, fitHeight];

            // update min and max zoom before adding presets into the mix
            // because presets should not be able to override min/max zoom
            this.state.minZoom = this.config.minZoom || zoomLevels[0];
            this.state.maxZoom = this.config.maxZoom || zoomLevels[zoomLevels.length - 1];

            // if auto is not the same as fitWidth or fitHeight,
            // add it as a possible next zoom
            if (auto !== fitWidth && auto !== fitHeight) {
                presets.push(auto);
            }

            // add auto-zoom levels and sort
            zoomLevels = zoomLevels.concat(presets);
            zoomLevels.sort(function sortZoomLevels(a, b){
                return a - b;
            });

            this.zoomLevels = [];

            /**
             * Return true if we should use this zoom level
             * @param   {number} zoomLevel The zoom level to consider
             * @returns {boolean}          True if we should keep this level
             * @private
             */
            function shouldUseZoomLevel(zoomLevel) {
                var similarity = lastZoomLevel / zoomLevel;
                // remove duplicates
                if (zoomLevel === lastZoomLevel) {
                    return false;
                }
                // keep anything that is within the similarity threshold
                if (similarity < ZOOM_LEVEL_SIMILARITY_THRESHOLD) {
                    return true;
                }
                // check if it's a preset
                if (util.inArray(zoomLevel, presets) > -1) {
                    // keep presets if they are within a higher threshold
                    if (similarity < ZOOM_LEVEL_PRESETS_SIMILARITY_THRESHOLD) {
                        return true;
                    }
                }
                return false;
            }

            // remove duplicates from sorted list, and remove unnecessary levels
            // @NOTE: some zoom levels end up being very close to the built-in
            // presets (fit-width/fit-height/auto), which makes zooming previous
            // or next level kind of annoying when the zoom level barely changes.
            // This fixes that by applying a threshold to the zoom levels to
            // each preset, and removing the non-preset version if the
            // ratio is below the threshold.
            lastZoomLevel = 0;
            for (i = 0; i < zoomLevels.length; ++i) {
                if (shouldUseZoomLevel(zoomLevels[i])) {
                    lastZoomLevel = zoomLevels[i];
                    this.zoomLevels.push(lastZoomLevel);
                }
            }
        },

        /**
         * Calculate the numeric value for a given zoom mode (or return the value if it's already numeric)
         * @param   {string} mode The mode to zoom to
         * @returns {float}       The zoom value
         */
        calculateZoomValue: function (mode) {
            var state = this.state,
                val = parseFloat(mode);
            if (val) {
                return val;
            }
            if (mode === Crocodoc.ZOOM_FIT_WIDTH) {
                return state.viewportDimensions.clientWidth / state.widestPage.totalActualWidth;
            }
            else if (mode === Crocodoc.ZOOM_FIT_HEIGHT) {
                return state.viewportDimensions.clientHeight / state.tallestPage.totalActualHeight;
            }
            else if (mode === Crocodoc.ZOOM_AUTO) {
                return this.calculateZoomAutoValue();
            } else {
                return state.zoomState.zoom;
            }
        },

        /**
         * Apply the given zoom to the pages
         * @param   {float} zoom The zoom value
         * @returns {void}
         */
        applyZoom: function (zoom) {
            applyZoomResize(this, zoom);
        },

        /**
         * Scroll to the given value (page number or one of the scroll constants)
         * @param   {int|string} val  The value to scroll to
         * @returns {void}
         */
        scrollTo: function (val) {
            var state = this.state,
                pageNum = parseInt(val, 10);
            if (typeof val === 'string') {
                if (val === Crocodoc.SCROLL_PREVIOUS && state.currentPage > 1) {
                    pageNum = this.calculatePreviousPage();
                }
                else if (val === Crocodoc.SCROLL_NEXT && state.currentPage < this.numPages) {
                    pageNum = this.calculateNextPage();
                }
                else if (!pageNum) {
                    return;
                }
            }
            else if (!pageNum && pageNum !== 0) {
                // pageNum is not a number
                return;
            }
            pageNum = util.clamp(pageNum, 1, this.numPages);
            this.scrollToPage(pageNum);
        },

        /**
         * Scroll to the given page number
         * @param   {int} page The page number to scroll to
         * @returns {void}
         */
        scrollToPage: function (page) {
            var offset = this.calculateScrollPositionForPage(page);
            this.scrollToOffset(offset.left, offset.top);
        },

        /**
         * Calculate which page is currently the "focused" page.
         * By default, it's just the state's current page.
         * @NOTE: this method will be overridden in most layouts.
         * @returns {int} The current page
         */
        calculateCurrentPage: function () {
            return this.state.currentPage;
        },

        /**
         * Given a page number, return an object with top and left properties
         * of the scroll position for that page
         * @param   {int} pageNum The page number
         * @returns {Object}      The scroll position object
         */
        calculateScrollPositionForPage: function (pageNum) {
            var index = util.clamp(pageNum - 1, 0, this.numPages - 1),
                page = this.state.pages[index];
            return { top: page.y0, left: page.x0 };
        },

        /**
         * Calculates the current range of pages that are visible
         * @returns {Object} Range object with min and max values
         */
        calculateVisibleRange: function () {
            var state = this.state,
                pages = state.pages,
                viewportHeight = state.viewportDimensions.clientHeight,
                viewportWidth = state.viewportDimensions.clientWidth;

            // no pages are visible, but this case breaks the logic below,
            // becasue page widths/heights will also be 0
            if (viewportWidth === 0 || viewportHeight === 0) {
                return {
                    min: -1,
                    max: -1
                };
            }

            var viewportY0 = state.scrollTop,
                viewportY1 = viewportY0 + viewportHeight,
                viewportX0 = state.scrollLeft,
                viewportX1 = viewportX0 + viewportWidth,
                lowY = util.bisectLeft(pages, viewportY0, 'y1'),
                highY = util.bisectRight(pages, viewportY1, 'y0') - 1,
                lowX = util.bisectLeft(pages, viewportX0, 'x1'),
                highX = util.bisectRight(pages, viewportX1, 'x0') - 1,
                low = Math.max(lowX, lowY),
                high = Math.min(highX, highY);

            return util.constrainRange(low, high, this.numPages - 1);
        },

        /**
         * Calculates the current range of pages that are fully visible
         * @returns {Object} Range object with min and max values
         * @NOTE: the only difference between this and calculateVisibleRange is
         * the bisectLeft/Right section below uses the opposite fields in the
         * page objects to test against. (TODO) Consider refactoring this to
         * make it a little simpler...
         */
        calculateFullyVisibleRange: function () {
            var state = this.state,
                pages = state.pages,
                viewportHeight = state.viewportDimensions.clientHeight,
                viewportWidth = state.viewportDimensions.clientWidth;

            // no pages are visible, but this case breaks the logic below
            // becasue page widths/heights will also be 0
            if (viewportWidth === 0 || viewportHeight === 0) {
                return {
                    min: -1,
                    max: -1
                };
            }

            var viewportY0 = state.scrollTop,
                viewportY1 = viewportY0 + viewportHeight,
                viewportX0 = state.scrollLeft,
                viewportX1 = viewportX0 + viewportWidth,
                lowY = util.bisectLeft(pages, viewportY0, 'y0'),
                highY = util.bisectRight(pages, viewportY1, 'y1') - 1,
                lowX = util.bisectLeft(pages, viewportX0, 'x0'),
                highX = util.bisectRight(pages, viewportX1, 'x1') - 1,
                low = Math.max(lowX, lowY),
                high = Math.min(highX, highY);

            return util.constrainRange(low, high, this.numPages - 1);
        },

        /**
         * Set the current page, update the visible pages, and broadcast a
         * pagefocus  message if the given page is not already the current page
         * @param {int} page The page number
         */
        setCurrentPage: function (page) {
            var state = this.state;
            if (state.currentPage !== page) {
                // page has changed
                state.currentPage = page;
                this.updateVisiblePages();
                scope.broadcast('pagefocus', {
                    page: state.currentPage,
                    numPages: this.numPages,
                    visiblePages: util.extend([], state.visiblePages),
                    fullyVisiblePages: util.extend([], state.fullyVisiblePages)
                });
            } else {
                // still update visible pages!
                this.updateVisiblePages();
            }
        },

        /**
         * Calculate and update which pages are visible,
         * possibly updating CSS classes on the pages
         * @param {boolean} updateClasses Wheter to update page CSS classes as well
         * @returns {void}
         */
        updateVisiblePages: function (updateClasses) {
            var i, len, $page,
                state = this.state,
                visibleRange = this.calculateVisibleRange(),
                fullyVisibleRange = this.calculateFullyVisibleRange();
            state.visiblePages.length = 0;
            state.fullyVisiblePages.length = 0;
            for (i = 0, len = this.$pages.length; i < len; ++i) {
                $page = this.$pages.eq(i);
                if (i < visibleRange.min || i > visibleRange.max) {
                    if (updateClasses && $page.hasClass(CSS_CLASS_PAGE_VISIBLE)) {
                        $page.removeClass(CSS_CLASS_PAGE_VISIBLE);
                    }
                } else {
                    if (updateClasses && !$page.hasClass(CSS_CLASS_PAGE_VISIBLE)) {
                        $page.addClass(CSS_CLASS_PAGE_VISIBLE);
                    }
                    state.visiblePages.push(i + 1);
                }
                if (i >= fullyVisibleRange.min && i <= fullyVisibleRange.max) {
                    state.fullyVisiblePages.push(i + 1);
                }
            }
        },

        /**
         * Update page positions, sizes, and rows
         * @param {boolean} [forceUpdatePaddings] If true, force update page paddings
         * @returns {void}
         */
        updatePageStates: function (forceUpdatePaddings) {
            var state = this.state,
                pages = state.pages,
                rows = state.rows,
                scrollTop = this.$viewport.scrollTop(),
                scrollLeft = this.$viewport.scrollLeft(),
                rowIndex = 0,
                lastY1 = 0,
                rightmostPageIndex = 0,
                bottommostPageIndex = 0,
                i,
                len,
                page,
                pageEl,
                $pageEl;

            rows.length = state.sumWidths = state.sumHeights = state.totalWidth = state.totalHeight = 0;
            state.widestPage.totalActualWidth = state.tallestPage.totalActualHeight = 0;

            // update the x/y positions and sizes of each page
            // this is basically used as a cache, since accessing the DOM is slow
            for (i = 0, len = this.$pages.length; i < len; ++i) {
                $pageEl = this.$pages.eq(i);
                pageEl = $pageEl[0];
                page = pages[i];
                if (!page || forceUpdatePaddings) {
                    $pageEl.css('padding', '');
                    page = {
                        index: i,
                        // only get paddings on the first updatePageStates
                        // @TODO: look into using numeric versions of these styles in IE for better perf
                        paddingLeft: parseFloat($pageEl.css(STYLE_PADDING_LEFT)),
                        paddingRight: parseFloat($pageEl.css(STYLE_PADDING_RIGHT)),
                        paddingTop: parseFloat($pageEl.css(STYLE_PADDING_TOP)),
                        paddingBottom: parseFloat($pageEl.css(STYLE_PADDING_BOTTOM))
                    };
                }

                if (!page.actualWidth) {
                    page.actualWidth = parseFloat(pageEl.getAttribute('data-width'));
                }
                if (!page.actualHeight) {
                    page.actualHeight = parseFloat(pageEl.getAttribute('data-height'));
                }

                page.totalActualWidth = page.actualWidth + page.paddingLeft + page.paddingRight;
                page.totalActualHeight = page.actualHeight + page.paddingTop + page.paddingBottom;

                page.width = pageEl.offsetWidth;
                page.height = pageEl.offsetHeight;
                page.x0 = pageEl.offsetLeft;
                page.y0 = pageEl.offsetTop;

                page.x1 = page.width + page.x0;
                page.y1 = page.height + page.y0;

                // it is in the same rowIndex as the prev if y0 >= prev rowIndex max y1
                // @NOTE: we add two pixels to y0, because sometimes there
                // seems to be a little overlap #youcantexplainthat
                // @TODO: #explainthat
                if (lastY1 && getMaxY1InRow(pages, rows[rowIndex]) <= page.y0 + 2) {
                    rowIndex++;
                }
                lastY1 = page.y1;
                if (!rows[rowIndex]) {
                    rows[rowIndex] = [];
                }
                // all pages are not created equal
                if (page.totalActualWidth > state.widestPage.totalActualWidth) {
                    state.widestPage = page;
                }
                if (page.totalActualHeight > state.tallestPage.totalActualHeight) {
                    state.tallestPage = page;
                }
                state.sumWidths += page.width;
                state.sumHeights += page.height;
                page.rowIndex = rowIndex;
                pages[i] = page;
                rows[rowIndex].push(i);

                if (pages[rightmostPageIndex].x0 + pages[rightmostPageIndex].width < page.x0 + page.width) {
                    rightmostPageIndex = i;
                }
                if (pages[bottommostPageIndex].y0 + pages[bottommostPageIndex].height < page.y0 + page.height) {
                    bottommostPageIndex = i;
                }
            }

            state.totalWidth = pages[rightmostPageIndex].x0 + pages[rightmostPageIndex].width;
            state.totalHeight = pages[bottommostPageIndex].y0 + pages[bottommostPageIndex].height;
            state.scrollTop = scrollTop;
            state.scrollLeft = scrollLeft;
            this.setCurrentPage(this.calculateCurrentPage());
        },

        /**
         * Calculate and update the current page
         * @returns {void}
         */
        updateCurrentPage: function () {
            var currentPage = this.calculateCurrentPage();
            this.setCurrentPage(currentPage);
        },

        /**
         * Handle resize messages
         * @param   {Object} data Object containing width and height of the viewport
         * @returns {void}
         */
        handleResize: function (data) {
            var zoomMode = this.state.zoomState.zoomMode;
            this.state.viewportDimensions = data;
            this.updateZoomLevels();
            this.setZoom(zoomMode);
        },

        /**
         * Handle scrollend messages (forwarded to handleScroll)
         * @param   {Object} data Object containing scrollTop and scrollLeft of the viewport
         * @returns {void}
         */
        handleScrollEnd: function (data) {
            // update CSS classes
            this.$doc.find('.' + CSS_CLASS_CURRENT_PAGE).removeClass(CSS_CLASS_CURRENT_PAGE);
            this.$pages.eq(this.state.currentPage - 1).addClass(CSS_CLASS_CURRENT_PAGE);
            this.updateVisiblePages(true);
            this.handleScroll(data);
        },

        /**
         * Update the scroll position after a zoom
         * @param {bool} shouldNotCenter Whether or not the scroll position
         *                               should be updated to center the new
         *                               zoom level
         * @returns {void}
         */
        updateScrollPosition: function (shouldNotCenter) {
            var state = this.state,
                zoomState = state.zoomState,
                ratio = zoomState.zoom / zoomState.prevZoom,
                newScrollLeft, newScrollTop;

            // update scroll position
            newScrollLeft = state.scrollLeft * ratio;
            newScrollTop = state.scrollTop * ratio;

            // zoom to center
            if (shouldNotCenter !== true) {
                newScrollTop += state.viewportDimensions.offsetHeight * (ratio - 1) / 2;
                newScrollLeft += state.viewportDimensions.offsetWidth * (ratio - 1) / 2;
            }

            // scroll!
            this.scrollToOffset(newScrollLeft, newScrollTop);
        },

        /** MUST BE IMPLEMENTED IN LAYOUT **/
        updateLayout: function () {},
        calculateZoomAutoValue: function () { return 1; },
        calculateNextPage: function () { return 1; },
        calculatePreviousPage: function () { return 1; }
    });
});
