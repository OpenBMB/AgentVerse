/**
 * @fileoverview layout-base component definition
 * @author lakenen
 */

/**
 * Base layout component for controlling viewer layout and viewport
 */
Crocodoc.addComponent('layout-base', function (scope) {

    'use strict';

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    var util = scope.getUtility('common');

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        messages: [
            'resize',
            'scroll',
            'scrollend'
        ],

        /**
         * Handle framework messages
         * @param {string} name The name of the message
         * @param {Object} data The related data for the message
         * @returns {void}
         */
        onmessage: function (name, data) {
            switch (name) {
                case 'resize':
                    this.handleResize(data);
                    break;
                case 'scroll':
                    this.handleScroll(data);
                    break;
                case 'scrollend':
                    this.handleScrollEnd(data);
                    break;
                // no default
            }
        },

        /**
         * Initialize the Layout component
         * @returns {void}
         */
        init: function () {
            var config = scope.getConfig();
            this.config = config;
            // shortcut references to jq DOM objects
            this.$el = config.$el;
            this.$doc = config.$doc;
            this.$viewport = config.$viewport;
            this.$pages = config.$pages;
            this.numPages = config.numPages;

            // add the layout css class
            this.layoutClass = CSS_CLASS_LAYOUT_PREFIX + config.layout;
            this.$el.addClass(this.layoutClass);

            this.initState();
        },

        /**
         * Initalize the state object
         * @returns {void}
         */
        initState: function () {
            var viewportEl = this.$viewport[0],
                dimensionsEl = viewportEl;

            // use the documentElement for viewport dimensions
            // if we are using the window as the viewport
            if (viewportEl === window) {
                dimensionsEl = document.documentElement;
            }
            // setup initial state
            this.state = {
                scrollTop: viewportEl.scrollTop,
                scrollLeft: viewportEl.scrollLeft,
                viewportDimensions: {
                    clientWidth: dimensionsEl.clientWidth,
                    clientHeight: dimensionsEl.clientHeight,
                    offsetWidth: dimensionsEl.offsetWidth,
                    offsetHeight: dimensionsEl.offsetHeight
                },
                zoomState: {
                    zoom: 1,
                    prevZoom: 0,
                    zoomMode: null
                },
                initialWidth: 0,
                initialHeight: 0,
                totalWidth: 0,
                totalHeight: 0
            };
            this.zoomLevels = [];
        },

        /**
         * Destroy the Layout component
         * @returns {void}
         */
        destroy: function () {
            this.$doc.removeAttr('style');
            this.$el.removeClass(this.layoutClass);
        },

        /**
         * Set the zoom level for the layout (to be implemented)
         */
        setZoom: function () {},

        /**
         * Calculate the next zoom level for zooming in or out
         * @param   {string} direction Can be either Crocodoc.ZOOM_IN or Crocodoc.ZOOM_OUT
         * @returns {number|boolean} The next zoom level or false if the viewer cannot be
         *                               zoomed in the given direction
         */
        calculateNextZoomLevel: function (direction) {
            var i,
                zoom = false,
                currentZoom = this.state.zoomState.zoom,
                zoomLevels = this.zoomLevels;

            if (direction === Crocodoc.ZOOM_IN) {
                for (i = 0; i < zoomLevels.length; ++i) {
                    if (zoomLevels[i] > currentZoom) {
                        zoom = zoomLevels[i];
                        break;
                    }
                }
            } else if (direction === Crocodoc.ZOOM_OUT) {
                for (i = zoomLevels.length - 1; i >= 0; --i) {
                    if (zoomLevels[i] < currentZoom) {
                        zoom = zoomLevels[i];
                        break;
                    }
                }
            }

            return zoom;
        },

        /**
         * Returns true if the layout is currently draggable
         * (in this case that means that the viewport is scrollable)
         * @returns {Boolean} Whether this layout is draggable
         */
        isDraggable: function () {
            var state = this.state;
            return (state.viewportDimensions.clientHeight < state.totalHeight) ||
                   (state.viewportDimensions.clientWidth < state.totalWidth);
        },

        /**
         * Scrolls by the given pixel amount from the current location
         * @param  {int} left Left offset to scroll to
         * @param  {int} top  Top offset to scroll to
         * @returns {void}
         */
        scrollBy: function (left, top) {
            left = parseInt(left, 10) || 0;
            top = parseInt(top, 10) || 0;
            this.scrollToOffset(left + this.state.scrollLeft, top + this.state.scrollTop);
        },

        /**
         * Scroll to the given left and top offset
         * @param   {int} left The left offset
         * @param   {int} top  The top offset
         * @returns {void}
         */
        scrollToOffset: function (left, top) {
            this.$viewport.scrollLeft(left);
            this.$viewport.scrollTop(top);
        },

        /**
         * Handle scroll messages
         * @param   {Object} data Object containing scrollTop and scrollLeft of the viewport
         * @returns {void}
         */
        handleScroll: function (data) {
            this.state.scrollTop = data.scrollTop;
            this.state.scrollLeft = data.scrollLeft;
        },

        /**
         * Handle resize messages (to be implemented in layout)
         */
        handleResize: function () {},
        /**
         * Handle scrollend messages (to be implemented in layout)
         */
        handleScrollEnd: function () {},

        /**
         * Force a full layout update (to be implemented in layout)
         */
        update: function () {},

        /**
         * Focuses the viewport so it can be natively scrolled with the keyboard
         * @returns {void}
         */
        focus: function () {
            this.$viewport.focus();
        },

        /**
         * Shortcut method to extend this layout
         * @param   {Object} layout The layout mixins
         * @returns {Object}        The extended layout
         */
        extend: function (layout) {
            return util.extend({}, this, layout);
        }
    };
});
