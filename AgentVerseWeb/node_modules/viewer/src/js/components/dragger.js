/**
 * @fileoverview Dragger component used to click-to-drag the document when enabled
 * @author lakenen
 */

/**
 * Dragger component definition
 */
Crocodoc.addComponent('dragger', function (scope) {

    'use strict';

    var $el,
        $window = $(window),
        downScrollPosition,
        downMousePosition;

    /**
     * Handle mousemove events
     * @param   {Event} event The event object
     * @returns {void}
     */
    function handleMousemove(event) {
        $el.scrollTop(downScrollPosition.top - (event.clientY - downMousePosition.y));
        $el.scrollLeft(downScrollPosition.left - (event.clientX - downMousePosition.x));
        event.preventDefault();
    }

    /**
     * Handle mouseup events
     * @param   {Event} event The event object
     * @returns {void}
     */
    function handleMouseup(event) {
        scope.broadcast('dragend');
        $window.off('mousemove', handleMousemove);
        $window.off('mouseup', handleMouseup);
        event.preventDefault();
    }

    /**
     * Handle mousedown events
     * @param   {Event} event The event object
     * @returns {void}
     */
    function handleMousedown(event) {
        scope.broadcast('dragstart');
        downScrollPosition = {
            top: $el.scrollTop(),
            left: $el.scrollLeft()
        };
        downMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
        $window.on('mousemove', handleMousemove);
        $window.on('mouseup', handleMouseup);
        event.preventDefault();
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        /**
         * Initialize the scroller component
         * @param   {Element} el The Element
         * @returns {void}
         */
        init: function (el) {
            $el = $(el);
            $el.on('mousedown', handleMousedown);
        },

        /**
         * Destroy the scroller component
         * @returns {void}
         */
        destroy: function () {
            $el.off('mousedown', handleMousedown);
            $el.off('mousemove', handleMousemove);
            $window.off('mouseup', handleMouseup);
        }
    };
});
