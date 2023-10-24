/**
 * @fileoverview page-link component
 * @author lakenen
 */

/**
 * page-links component definition
 */
Crocodoc.addComponent('page-links', function (scope) {

    'use strict';

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    var $el,
        browser = scope.getUtility('browser');

    /**
     * Create a link element given link data
     * @param   {Object} link The link data
     * @returns {void}
     * @private
     */
    function createLink(link) {
        var $link = $('<a>').addClass(CSS_CLASS_PAGE_LINK),
            left = link.bbox[0],
            top = link.bbox[1],
            attr = {};

        if (browser.ie) {
            // @NOTE: IE doesn't allow override of ctrl+click on anchor tags,
            // but there is a workaround to add a child element (which triggers
            // the onclick event first)
            $('<span>')
                .appendTo($link)
                .on('click', handleClick);
        }

        $link.css({
            left: left + 'pt',
            top: top + 'pt',
            width: link.bbox[2] - left + 'pt',
            height: link.bbox[3] - top + 'pt'
        });

        if (link.uri) {
            if (/^http|^mailto/.test(link.uri)) {
                attr.href = encodeURI(link.uri);
                attr.target = '_blank';
            } else {
                // don't embed this link... we don't trust the protocol
                return;
            }
        } else if (link.destination) {
            attr.href = '#page-' + link.destination.pagenum;
        }

        $link.attr(attr);
        $link.data('link', link);
        $link.appendTo($el);
    }

    /**
     * Handle link clicks
     * @param   {Event} event The event object
     * @returns {void}
     * @private
     */
    function handleClick(event) {
        var targetEl = browser.ie ? event.target.parentNode : event.target,
            $link = $(targetEl),
            data = $link.data('link');

        if (data) {
            scope.broadcast('linkclick', data);
        }
        event.preventDefault();
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        /**
         * Initialize the page-links component
         * @param  {Array} links Links configuration array
         * @returns {void}
         * @TODO (possible): make a links data-provider instead of passing
         * them in as an argument?
         */
        init: function (el, links) {
            $el = $(el);
            this.createLinks(links);
            if (!browser.ie) {
                // @NOTE: event handlers are individually bound in IE, because
                // the ctrl+click workaround fails when using event delegation
                $el.on('click', '.' + CSS_CLASS_PAGE_LINK, handleClick);
            }
        },

        /**
         * Destroy the page-links component
         * @returns {void}
         */
        destroy: function () {
            // @NOTE: individual click event handlers needed for IE are
            // implicitly removed by jQuery when we empty the links container
            $el.empty().off('click');
            $el = browser = null;
        },

        /**
         * Create and insert link elements into the element
         * @param   {Array} links Array of link data
         * @returns {void}
         */
        createLinks: function (links) {
            var i, len;
            for (i = 0, len = links.length; i < len; ++i) {
                createLink(links[i]);
            }
        }
    };
});
