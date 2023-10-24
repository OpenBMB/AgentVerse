/**
 * @fileoverview Crocodoc.Viewer definition
 * @author lakenen
 */

/**
 * The Crocodoc.Viewer namespace
 * @namespace
 */
(function () {
    'use strict';

    var viewerInstanceCount = 0,
        instances = {};

    /**
     * Crocodoc.Viewer constructor
     * @param {jQuery|string|Element} el The element to wrap
     * @param {Object} options           Configuration options
     * @constructor
     */
    Crocodoc.Viewer = function (el, options) {
        // call the EventTarget constructor to init handlers
        Crocodoc.EventTarget.call(this);

        var util = Crocodoc.getUtility('common');
        var layout,
            $el = $(el),
            config = util.extend(true, {}, Crocodoc.Viewer.defaults, options),
            scope = new Crocodoc.Scope(config),
            viewerBase = scope.createComponent('viewer-base');

        //Container exists?
        if ($el.length === 0) {
            throw new Error('Invalid container element');
        }

        this.id = config.id = ++viewerInstanceCount;
        config.api = this;
        config.$el = $el;
        // register this instance
        instances[this.id] = this;

        function init() {
            viewerBase.init();
        }

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        /**
         * Destroy the viewer instance
         * @returns {void}
         */
        this.destroy = function () {
            // unregister this instance
            delete instances[config.id];

            // broadcast a destroy message
            scope.broadcast('destroy');

            // destroy all components and plugins in this scope
            scope.destroy();
        };

        /**
         * Intiate loading of document assets
         * @returns {void}
         */
        this.load = function () {
            viewerBase.loadAssets();
        };

        /**
         * Set the layout to the given mode, destroying and cleaning up the current
         * layout if there is one
         * @param  {string} mode The layout mode
         * @returns {void}
         */
        this.setLayout = function (mode) {
            // removing old reference to prevent errors when handling layoutchange message
            layout = null;
            layout = viewerBase.setLayout(mode);
        };

        /**
         * Zoom to the given value
         * @param  {float|string} val Numeric zoom level to zoom to or one of:
         *                            Crocodoc.ZOOM_IN
         *                            Crocodoc.ZOOM_OUT
         *                            Crocodoc.ZOOM_AUTO
         *                            Crocodoc.ZOOM_FIT_WIDTH
         *                            Crocodoc.ZOOM_FIT_HEIGHT
         * @returns {void}
         */
        this.zoom = function (val) {
            // adjust for page scale if passed value is a number
            var valFloat = parseFloat(val);
            if (layout) {
                if (valFloat) {
                    val = valFloat / (config.pageScale || 1);
                }
                layout.setZoom(val);
            }
        };

        /**
         * Scroll to the given page
         * @TODO: rename to scrollToPage when possible (and remove this for non-
         * page-based viewers)
         * @param  {int|string} page Page number or one of:
         *                           Crocodoc.SCROLL_PREVIOUS
         *                           Crocodoc.SCROLL_NEXT
         * @returns {void}
         */
        this.scrollTo = function (page) {
            if (layout && util.isFn(layout.scrollTo)) {
                layout.scrollTo(page);
            }
        };

        /**
         * Scrolls by the given pixel amount from the current location
         * @param  {int} left Left offset to scroll to
         * @param  {int} top  Top offset to scroll to
         * @returns {void}
         */
        this.scrollBy = function (left, top) {
            if (layout) {
                layout.scrollBy(left, top);
            }
        };

        /**
         * Focuses the viewport so it can be natively scrolled with the keyboard
         * @returns {void}
         */
        this.focus = function () {
            if (layout) {
                layout.focus();
            }
        };

        /**
         * Enable text selection, loading text assets per page if necessary
         * @returns {void}
         */
        this.enableTextSelection = function () {
            $el.toggleClass(CSS_CLASS_TEXT_DISABLED, false);
            if (!config.enableTextSelection) {
                config.enableTextSelection = true;
                scope.broadcast('textenabledchange', { enabled: true });
            }
        };

        /**
         * Disable text selection, hiding text layer on pages if it's already there
         * and disabling the loading of new text assets
         * @returns {void}
         */
        this.disableTextSelection = function () {
            $el.toggleClass(CSS_CLASS_TEXT_DISABLED, true);
            if (config.enableTextSelection) {
                config.enableTextSelection = false;
                scope.broadcast('textenabledchange', { enabled: false });
            }
        };

        /**
         * Enable links
         * @returns {void}
         */
        this.enableLinks = function () {
            if (!config.enableLinks) {
                $el.removeClass(CSS_CLASS_LINKS_DISABLED);
                config.enableLinks = true;
            }
        };

        /**
         * Disable links
         * @returns {void}
         */
        this.disableLinks = function () {
            if (config.enableLinks) {
                $el.addClass(CSS_CLASS_LINKS_DISABLED);
                config.enableLinks = false;
            }
        };

        /**
         * Force layout update
         * @returns {void}
         */
        this.updateLayout = function () {
            if (layout) {
                layout.update();
            }
        };

        init();
    };

    Crocodoc.Viewer.prototype = new Crocodoc.EventTarget();
    Crocodoc.Viewer.prototype.constructor = Crocodoc.Viewer;

    /**
     * Get a viewer instance by id
     * @param {number} id   The id
     * @returns {Object}    The viewer instance
     */
    Crocodoc.Viewer.get = function (id) {
        return instances[id];
    };

    // Global defaults
    Crocodoc.Viewer.defaults = {
        // the url to load the assets from (required)
        url: null,

        // document viewer layout
        layout: LAYOUT_VERTICAL,

        // initial zoom level
        zoom: ZOOM_AUTO,

        // page to start on
        page: 1,

        // enable/disable text layer
        enableTextSelection: true,

        // enable/disable links layer
        enableLinks: true,

        // enable/disable click-and-drag
        enableDragging: false,

        // query string parameters to append to all asset requests
        queryParams: null,

        // plugin configs
        plugins: {},

        // whether to use the browser window as the viewport into the document (this
        // is useful when the document should take up the entire browser window, e.g.,
        // on mobile devices)
        useWindowAsViewport: false,

        //--------------------------------------------------------------------------
        // The following are undocumented, internal, or experimental options,
        // which are very subject to change and likely to be broken.
        // --
        // USE AT YOUR OWN RISK!
        //--------------------------------------------------------------------------

        // whether or not the conversion is finished (eg., pages are ready to be loaded)
        conversionIsComplete: true,

        // template for loading assets... this should rarely (if ever) change
        template: {
            svg: 'page-{{page}}.svg',
            img: 'page-{{page}}.png',
            html: 'text-{{page}}.html',
            css: 'stylesheet.css',
            json: 'info.json'
        },

        // default data-providers
        dataProviders: {
            metadata: 'metadata',
            stylesheet: 'stylesheet',
            'page-svg': 'page-svg',
            'page-text': 'page-text',
            'page-img': 'page-img'
        },

        // page to start/end on (pages outside this range will not be shown)
        pageStart: null,
        pageEnd: null,

        // whether or not to automatically load page one assets immediately (even
        // if conversion is not yet complete)
        autoloadFirstPage: true,

        // zoom levels are relative to the viewport size,
        // and the dynamic zoom levels (auto, fitwidth, etc) will be added into the mix
        zoomLevels: [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 2.0, 3.0]
    };
})();

