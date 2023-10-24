/**
 * @fileoverview Page component
 * @author lakenen
 */

/**
 * Page component
 */
Crocodoc.addComponent('page', function (scope) {

    'use strict';

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    var support = scope.getUtility('support'),
        util = scope.getUtility('common');

    var $el,
        pageText, pageContent, pageLinks,
        pageNum, index,
        isVisible, status,
        loadRequested = false;

    return {
        messages: [
            'pageavailable',
            'pagefocus',
            'textenabledchange',
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
                case 'pageavailable':
                    if (data.page === index + 1 || data.upto > index || data.all === true) {
                        if (status === PAGE_STATUS_CONVERTING) {
                            status = PAGE_STATUS_NOT_LOADED;
                        }
                    }
                    break;
                case 'textenabledchange':
                    if (data.enabled === true) {
                        this.enableTextSelection();
                    } else {
                        this.disableTextSelection();
                    }
                    break;
                case 'pagefocus':
                    // falls through
                case 'zoom':
                    isVisible = pageNum === data.page || (util.inArray(pageNum, data.visiblePages) > -1);
                    break;

                // no default
            }
        },

        /**
         * Initialize the Page component
         * @returns {void}
         */
        init: function ($pageEl, config) {
            var $text, $svg, $links;
            $el = $pageEl;
            $svg = $pageEl.find('.' + CSS_CLASS_PAGE_SVG);
            $text = $pageEl.find('.' + CSS_CLASS_PAGE_TEXT);
            $links = $pageEl.find('.' + CSS_CLASS_PAGE_LINKS);

            status = config.status || PAGE_STATUS_NOT_LOADED;
            index = config.index;
            pageNum = index + 1;
            this.config = config;

            config.url = config.url || '';
            pageText = scope.createComponent('page-text');
            if (config.useSVG === undefined) {
                config.useSVG = true;
            }
            pageContent = support.svg && config.useSVG ?
                    scope.createComponent('page-svg') :
                    scope.createComponent('page-img');

            pageText.init($text, pageNum);
            pageContent.init($svg, pageNum);

            if (config.enableLinks && config.links.length) {
                pageLinks = scope.createComponent('page-links');
                pageLinks.init($links, config.links);
            }
        },

        /**
         * Destroy the page component
         * @returns {void}
         */
        destroy: function () {
            this.unload();
        },

        /**
         * Preload the SVG if the page is not loaded
         * @returns {void}
         */
        preload: function () {
            pageContent.prepare();
            if (status === PAGE_STATUS_NOT_LOADED) {
                pageContent.preload();
                pageText.preload();
            }
        },

        /**
         * Load and show SVG and text assets for this page
         * @returns {$.Promise}    jQuery Promise object or false if the page is not loading
         */
        load: function () {
            var pageComponent = this;

            loadRequested = true;

            // the page has failed to load for good... don't try anymore
            if (status === PAGE_STATUS_ERROR) {
                return false;
            }

            // don't actually load if the page is converting
            if (status === PAGE_STATUS_CONVERTING) {
                return false;
            }

            // request assets to be loaded... but only ACTUALLY load if it is
            // not loaded already
            if (status !== PAGE_STATUS_LOADED) {
                status = PAGE_STATUS_LOADING;
            }
            return $.when(pageContent.load(), pageText.load())
                .done(function handleLoadDone() {
                    if (loadRequested) {
                        if (status !== PAGE_STATUS_LOADED) {
                            $el.removeClass(CSS_CLASS_PAGE_LOADING);
                            status = PAGE_STATUS_LOADED;
                            scope.broadcast('pageload', { page: pageNum });
                        }
                    } else {
                        pageComponent.unload();
                    }
                })
                .fail(function handleLoadFail(error) {
                    status = PAGE_STATUS_ERROR;
                    $el.addClass(CSS_CLASS_PAGE_ERROR);
                    scope.broadcast('pagefail', { page: index + 1, error: error });
                });
        },

        /**
         * Unload/hide SVG and text assets for this page
         * @returns {void}
         */
        unload: function () {
            loadRequested = false;
            pageContent.unload();
            pageText.unload();
            if (status === PAGE_STATUS_LOADED) {
                status = PAGE_STATUS_NOT_LOADED;
                $el.addClass(CSS_CLASS_PAGE_LOADING);
                $el.removeClass(CSS_CLASS_PAGE_ERROR);
                scope.broadcast('pageunload', { page: pageNum });
            }
        },

        /**
         * Enable text selection, loading text assets if the page is visible
         * @returns {void}
         */
        enableTextSelection: function () {
            pageText.enable();
            if (isVisible) {
                pageText.load();
            }
        },

        /**
         * Disable text selection
         * @returns {void}
         */
        disableTextSelection: function () {
            pageText.disable();
        }
    };
});


