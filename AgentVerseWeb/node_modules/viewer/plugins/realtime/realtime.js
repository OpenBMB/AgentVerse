/**
 * @fileOverview The realtime plugin for the View API
 * @author lakenen
 */

(function () {

/**
 * Wrapper around the EventSource object for simple event subscription
 * @param {string} url The realtime URL to connect to
 * @param {Function} EventSource EventSource constructor to use
 * @constructor
 */
function Realtime(url, EventSource) {
    if (!EventSource) {
        throw new Error('Realtime plugin requires EventSource support');
    }
    this.eventSource = new EventSource(url);
}

Realtime.prototype = {
    constructor: Realtime,

    /**
     * Subscribe to realtime events for the given event name
     * @param   {string}   name     The name of the event
     * @param   {Function} handler  The event handler function
     * @returns {void}
     */
    on: function (name, handler) {
        this.eventSource.addEventListener(name, handler, false);
    },

    /**
     * Unsubscribe from a realtime event of the given name and handler
     * @param   {string}   name     The name of the event
     * @param   {Function} handler  The event handler function
     * @returns {void}
     */
    off: function (name, handler) {
        this.eventSource.removeEventListener(name, handler);
    },

    /**
     * Cleans up the eventSource object
     * @returns {void}
     */
    destroy: function () {
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = null;
        }
    }
};

// expose this on the Crocodoc namespace for testing
Crocodoc.Realtime = Realtime;

Crocodoc.addPlugin('realtime', function (scope) {
    'use strict';

    var util = scope.getUtility('common'),
        viewerConfig = scope.getConfig(),
        viewerAPI = viewerConfig.api,
        realtime;

    /**
     * Try to parse event data as JSON, else return the original data
     * @param   {Event} event The realtime event
     * @returns {*}       The parsed data
     * @private
     */
    function getData(event) {
        try {
            return util.parseJSON(event.data);
        } catch (e) {
            return event.data;
        }
    }

    /**
     * Notify the viewer that new pages are available for loading
     * @param   {Array} pages Array of integer page numbers that are available
     * @returns {void}
     * @private
     */
    function updateAvailablePages(pages) {
        var i, page;
        for (i = 0; i < pages.length; ++i) {
            page = pages[i];
            viewerAPI.fire('realtimeupdate', { page: page });
            scope.broadcast('pageavailable', { page: page });
        }
    }

    /**
     * Handle pageavailable eventSource events
     * @param   {Event} event The event object
     * @returns {void}
     * @private
     */
    function handlePageAvailableEvent(event) {
        var data = getData(event);
        updateAvailablePages(data.pages);
    }

    /**
     * Handle error and failed eventSource events
     * @param   {Event} event The event object
     * @returns {void}
     * @private
     */
    function handleFailedEvent(event) {
        var data = getData(event);
        viewerAPI.fire('realtimeerror', { error: data });
        realtime.destroy();
    }

    /**
     * Handle finished eventSource events
     * @param   {Event} event The event object
     * @returns {void}
     * @private
     */
    function handleFinishedEvent() {
        // @NOTE: we can't use upto: numpages here, because we might not know
        // how many pages there are yet
        scope.broadcast('pageavailable', { all: true });
        viewerAPI.fire('realtimecomplete');
        realtime.destroy();
    }

    /**
     * Handle eventSource errors
     * @param   {Event} event The event object
     * @returns {void}
     * @private
     */
    function handleErrorEvent(event) {
        var data = getData(event);
        if (data) {
            viewerAPI.fire('realtimeerror', { error: data.message });
            if (data.close) {
                realtime.destroy();
            }
        }
    }

    /**
     * Registers event handlers for page streaming specific realtime events
     * @returns {void}
     * @private
     */
    function registerBoxViewPageEventHandlers() {
        // event names depend on whether we support svg or not
        if (scope.getUtility('support').svg) {
            realtime.on('pageavailable.svg', handlePageAvailableEvent);
            realtime.on('finished.svg', handleFinishedEvent);
            realtime.on('failed.svg', handleFailedEvent);
        } else {
            realtime.on('pageavailable.png', handlePageAvailableEvent);
            realtime.on('finished.png', handleFinishedEvent);
            realtime.on('failed.png', handleFailedEvent);
        }

        realtime.on('error', handleErrorEvent);
    }

    return {
        /**
         * Initialize the realtime plugin
         * @param   {Object} config     The config object
         * @param   {string} config.url The URL to connect to for realtime events
         * @param {Function} [EventSource] EventSource constructor to use (for testing purposes)
         * @returns {void}
         */
        init: function (config, EventSource) {
            var url = config.url;
            if (url) {
                realtime = new Crocodoc.Realtime(url, EventSource || window.EventSource);

                // force the viewer to think conversion is not complete
                // @TODO: ideally this wouldn't have to make an extra trip to
                // the server just to find out the doc is already done
                // converting, so we should have an indicator of the doc status
                // in the session endpoint response
                viewerConfig.conversionIsComplete = false;
                registerBoxViewPageEventHandlers();
            }
        },

        /**
         * Destroy and cleanup the realtime plugin
         * @returns {void}
         */
        destroy: function () {
            if (realtime) {
                realtime.destroy();
                realtime = null;
            }
            util = viewerAPI = viewerConfig = null;
        }
    };
});

})();
