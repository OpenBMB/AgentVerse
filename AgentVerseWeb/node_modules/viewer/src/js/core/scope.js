/**
 * @fileoverview Scope class definition
 * @author lakenen
 */

 (function () {

    'use strict';

    /**
     * Scope class used for component scoping (creating, destroying, broadcasting messages)
     * @constructor
     */
    Crocodoc.Scope = function Scope(config) {

        //----------------------------------------------------------------------
        // Private
        //----------------------------------------------------------------------

        var util = Crocodoc.getUtility('common');

        var instances = [],
            messageQueue = [],
            dataProviders = {},
            ready = false;

        /**
         * Broadcast a message to all components in this scope that have registered
         * a listener for the named message type
         * @param  {string} messageName The message name
         * @param  {any} data The message data
         * @returns {void}
         * @private
         */
        function broadcast(messageName, data) {
            var i, len, instance, messages;
            for (i = 0, len = instances.length; i < len; ++i) {
                instance = instances[i];
                if (!instance) {
                    continue;
                }
                messages = instance.messages || [];

                if (util.inArray(messageName, messages) !== -1) {
                    if (util.isFn(instance.onmessage)) {
                        instance.onmessage.call(instance, messageName, data);
                    }
                }
            }
        }

        /**
         * Broadcasts any (pageavailable) messages that were queued up
         * before the viewer was ready
         * @returns {void}
         * @private
         */
        function broadcastQueuedMessages() {
            var message;
            while (messageQueue.length) {
                message = messageQueue.shift();
                broadcast(message.name, message.data);
            }
            messageQueue = null;
        }

        /**
         * Call the destroy method on a component instance if it exists and the
         * instance has not already been destroyed
         * @param   {Object} instance The component instance
         * @returns {void}
         */
        function destroyComponent(instance) {
            if (util.isFn(instance.destroy) && !instance._destroyed) {
                instance.destroy();
                instance._destroyed = true;
            }
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        config.dataProviders = config.dataProviders || {};

        /**
         * Create and return an instance of the named component,
         * and add it to the list of instances in this scope
         * @param  {string} componentName The name of the component to create
         * @returns {?Object}     The component instance or null if the component doesn't exist
         */
        this.createComponent = function (componentName) {
            var instance = Crocodoc.createComponent(componentName, this);
            if (instance) {
                instance.componentName = componentName;
                instances.push(instance);
            }
            return instance;
        };

        /**
         * Remove and call the destroy method on a component instance
         * @param  {Object} instance The component instance to remove
         * @returns {void}
         */
        this.destroyComponent = function (instance) {
            var i, len;

            for (i = 0, len = instances.length; i < len; ++i) {
                if (instance === instances[i]) {
                    destroyComponent(instance);
                    instances.splice(i, 1);
                    break;
                }
            }
        };

        /**
         * Remove and call the destroy method on all instances in this scope
         * @returns {void}
         */
        this.destroy = function () {
            var i, len, instance,
                components = instances.slice();

            for (i = 0, len = components.length; i < len; ++i) {
                instance = components[i];
                destroyComponent(instance);
            }
            instances = [];
            dataProviders = {};
        };

        /**
         * Broadcast a message or queue it until the viewer is ready
         * @param   {string} name The name of the message
         * @param   {*} data The message data
         * @returns {void}
         */
        this.broadcast = function (messageName, data) {
            if (ready) {
                broadcast(messageName, data);
            } else {
                messageQueue.push({ name: messageName, data: data });
            }
        };

        /**
         * Passthrough method to the framework that retrieves utilities.
         * @param {string} name The name of the utility to retrieve
         * @returns {?Object}    An object if the utility is found or null if not
         */
        this.getUtility = function (name) {
            return Crocodoc.getUtility(name);
        };

        /**
         * Get the config object associated with this scope
         * @returns {Object} The config object
         */
        this.getConfig = function () {
            return config;
        };

        /**
         * Tell the scope that the viewer is ready and broadcast queued messages
         * @returns {void}
         */
        this.ready = function () {
            if (!ready) {
                ready = true;
                broadcastQueuedMessages();
            }
        };

        /**
         * Get a model object from a data provider. If the objectType is listed
         * in config.dataProviders, this will get the value from the data
         * provider that is specified in that map instead.
         * @param {string} objectType The type of object to retrieve ('page-svg', 'page-text', etc)
         * @param {string} objectKey  The key of the object to retrieve
         * @returns {$.Promise}
         */
        this.get = function(objectType, objectKey) {
            var newObjectType = config.dataProviders[objectType] || objectType;

            var provider = this.getDataProvider(newObjectType);
            if (provider) {
                return provider.get(objectType, objectKey);
            }
            return $.Deferred().reject('data-provider not found').promise();
        };

        /**
         * Get an instance of a data provider. Ignores config.dataProviders
         * overrides.
         * @param {string} objectType The type of object to retrieve a data provider for ('page-svg', 'page-text', etc)
         * @returns {Object} The data provider
         */
        this.getDataProvider = function (objectType) {
            var provider;
            if (dataProviders[objectType]) {
                provider = dataProviders[objectType];
            } else {
                provider = this.createComponent('data-provider-' + objectType);
                dataProviders[objectType] = provider;
            }

            return provider;
        };
    };
})();
