/**
 * @fileoverview Definition of a custom event type. This is used as a utility
 * throughout the framework whenever custom events are used. It is intended to
 * be inherited from, either through the prototype or via mixin.
 * @author nzakas
 * @author lakenen
 */

(function () {
    'use strict';

    /**
     * Build an event object for the given type and data
     * @param   {string} type The event type
     * @param   {Object} data The event data
     * @returns {Object}      The event object
     */
    function buildEventObject(type, data) {
        var isDefaultPrevented = false;
        return {
            type: type,
            data: data,

            /**
             * Prevent the default action for this event
             * @returns {void}
             */
            preventDefault: function () {
                isDefaultPrevented = true;
            },

            /**
             * Return true if preventDefault() has been called on this event
             * @returns {Boolean}
             */
            isDefaultPrevented: function () {
                return isDefaultPrevented;
            }
        };
    }

    /**
     * An object that is capable of generating custom events and also
     * executing handlers for events when they occur.
     * @constructor
     */
    Crocodoc.EventTarget = function() {

        /**
         * Map of events to handlers. The keys in the object are the event names.
         * The values in the object are arrays of event handler functions.
         * @type {Object}
         * @private
         */
        this._handlers = {};
    };

    Crocodoc.EventTarget.prototype = {

        // restore constructor
        constructor: Crocodoc.EventTarget,

        /**
         * Adds a new event handler for a particular type of event.
         * @param {string} type The name of the event to listen for.
         * @param {Function} handler The function to call when the event occurs.
         * @returns {void}
         */
        on: function(type, handler) {
            if (typeof this._handlers[type] === 'undefined') {
                this._handlers[type] = [];
            }

            this._handlers[type].push(handler);
        },

        /**
         * Fires an event with the given name and data.
         * @param {string} type The type of event to fire.
         * @param {Object} data An object with properties that should end up on
         *      the event object for the given event.
         * @returns {Object} The event object
         */
        fire: function(type, data) {
            var handlers,
                i,
                len,
                event = buildEventObject(type, data);

            // if there are handlers for the event, call them in order
            handlers = this._handlers[event.type];
            if (handlers instanceof Array) {
                // @NOTE: do a concat() here to create a copy of the handlers array,
                // so that if another handler is removed of the same type, it doesn't
                // interfere with the handlers array
                handlers = handlers.concat();
                for (i = 0, len = handlers.length; i < len; i++) {
                    if (handlers[i]) {
                        handlers[i].call(this, event);
                    }
                }
            }

            // call handlers for `all` event type
            handlers = this._handlers.all;
            if (handlers instanceof Array) {
                // @NOTE: do a concat() here to create a copy of the handlers array,
                // so that if another handler is removed of the same type, it doesn't
                // interfere with the handlers array
                handlers = handlers.concat();
                for (i = 0, len = handlers.length; i < len; i++) {
                    if (handlers[i]) {
                        handlers[i].call(this, event);
                    }
                }
            }

            return event;
        },

        /**
         * Removes an event handler from a given event.
         * If the handler is not provided, remove all handlers of the given type.
         * @param {string} type The name of the event to remove from.
         * @param {Function} handler The function to remove as a handler.
         * @returns {void}
         */
        off: function(type, handler) {
            var handlers = this._handlers[type],
                i,
                len;

            if (handlers instanceof Array) {
                if (!handler) {
                    handlers.length = 0;
                    return;
                }
                for (i = 0, len = handlers.length; i < len; i++) {
                    if (handlers[i] === handler || handlers[i].handler === handler) {
                        handlers.splice(i, 1);
                        break;
                    }
                }
            }
        },


        /**
         * Adds a new event handler that should be removed after it's been triggered once.
         * @param {string} type The name of the event to listen for.
         * @param {Function} handler The function to call when the event occurs.
         * @returns {void}
         */
        one: function(type, handler) {
            var self = this,
                proxy = function (event) {
                    self.off(type, proxy);
                    handler.call(self, event);
                };
            proxy.handler = handler;
            this.on(type, proxy);
        }
    };

})();
