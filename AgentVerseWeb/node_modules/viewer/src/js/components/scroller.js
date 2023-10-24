/**
 * @fileoverview Scroller component used to watch an element and fire
 *               events `scrollstart`, `scroll`, and `scrollend`
 * @author lakenen
 */

/*global setTimeout, clearTimeout */

Crocodoc.addComponent('scroller', function (scope) {

    'use strict';

    var util = scope.getUtility('common'),
        browser = scope.getUtility('browser');

    var GHOST_SCROLL_TIMEOUT = 3000,
        GHOST_SCROLL_INTERVAL = 30,
        SCROLL_EVENT_THROTTLE_INTERVAL = 200,
        SCROLL_END_TIMEOUT = browser.mobile ? 500 : 250;

    var $el,
        scrollendTID,
        scrollingStarted = false,
        touchStarted = false,
        touchEnded = false,
        touchMoved = false,
        touchEndTime = 0,
        ghostScrollStart = null;

    /**
     * Build event data object for firing scroll events
     * @returns {Object} Scroll event data object
     * @private
     */
    function buildEventData() {
        return {
            scrollTop: $el.scrollTop(),
            scrollLeft: $el.scrollLeft()
        };
    }

    /**
     * Broadcast a scroll event
     * @returns {void}
     * @private
     */
    var fireScroll = util.throttle(SCROLL_EVENT_THROTTLE_INTERVAL, function () {
        scope.broadcast('scroll', buildEventData());
    });

    /**
     * Handle scrollend
     * @returns {void}
     * @private
     */
    function handleScrollEnd() {
        scrollingStarted = false;
        ghostScrollStart = null;
        clearTimeout(scrollendTID);
        scope.broadcast('scrollend', buildEventData());
    }

    /**
     * Handle scroll events
     * @returns {void}
     * @private
     */
    function handleScroll() {
        // if we are just starting scrolling, fire scrollstart event
        if (!scrollingStarted) {
            scrollingStarted = true;
            scope.broadcast('scrollstart', buildEventData());
        }
        clearTimeout(scrollendTID);
        scrollendTID = setTimeout(handleScrollEnd, SCROLL_END_TIMEOUT);
        fireScroll();
    }

    /**
     * Handle touch start events
     * @returns {void}
     * @private
     */
    function handleTouchstart() {
        touchStarted = true;
        touchEnded = false;
        touchMoved = false;
        handleScroll();
    }

    /**
     * Handle touchmove events
     * @returns {void}
     * @private
     */
    function handleTouchmove() {
        touchMoved = true;
        handleScroll();
    }

    /**
     * Handle touchend events
     * @returns {void}
     * @private
     */
    function handleTouchend() {
        touchStarted = false;
        touchEnded = true;
        touchEndTime = new Date().getTime();
        if (touchMoved) {
            ghostScroll();
        }
    }

    /**
     * Fire fake scroll events.
     * iOS doesn't fire events during the 'momentum' part of scrolling
     * so this is used to fake these events until the page stops moving.
     * @returns {void}
     * @private
     */
    function ghostScroll() {
        clearTimeout(scrollendTID);
        if (ghostScrollStart === null) {
            ghostScrollStart = new Date().getTime();
        }
        if (new Date().getTime() - ghostScrollStart > GHOST_SCROLL_TIMEOUT) {
            handleScrollEnd();
            return;
        }
        fireScroll();
        scrollendTID = setTimeout(ghostScroll, GHOST_SCROLL_INTERVAL);
    }

    return {
        /**
         * Initialize the scroller component
         * @param   {Element} el The Element
         * @returns {void}
         */
        init: function (el) {
            $el = $(el);
            $el.on('scroll', handleScroll);
            $el.on('touchstart', handleTouchstart);
            $el.on('touchmove', handleTouchmove);
            $el.on('touchend', handleTouchend);
        },

        /**
         * Destroy the scroller component
         * @returns {void}
         */
        destroy: function () {
            clearTimeout(scrollendTID);
            $el.off('scroll', handleScroll);
            $el.off('touchstart', handleTouchstart);
            $el.off('touchmove', handleTouchmove);
            $el.off('touchend', handleTouchend);
        }
    };
});
