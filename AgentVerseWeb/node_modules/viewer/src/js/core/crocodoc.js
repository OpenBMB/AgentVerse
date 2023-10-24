/**
 * @fileoverview Base namespaces for Crocodoc JavaScript.
 * @author lakenen
 */

/*jshint unused:false*/

if (typeof $ === 'undefined') {
    throw new Error('jQuery is required');
}

/**
 * The one global object for Crocodoc JavaScript.
 * @namespace
 */
var Crocodoc = (function () {

    'use strict';

    var components = {},
        utilities = {};

    /**
     * Find circular dependencies in component mixins
     * @param   {string} componentName   The component name that is being added
     * @param   {Array} dependencies  Array of component mixin dependencies
     * @param   {void} path           String used to keep track of depencency graph
     * @returns {void}
     */
    function findCircularDependencies(componentName, dependencies, path) {
        var i;
        path = path || componentName;
        for (i = 0; i < dependencies.length; ++i) {
            if (componentName === dependencies[i]) {
                throw new Error('Circular dependency detected: ' + path + '->' + dependencies[i]);
            } else if (components[dependencies[i]]) {
                findCircularDependencies(componentName, components[dependencies[i]].mixins, path + '->' + dependencies[i]);
            }
        }
    }

    return {
        // Zoom, scroll, page status, layout constants
        ZOOM_FIT_WIDTH:                 ZOOM_FIT_WIDTH,
        ZOOM_FIT_HEIGHT:                ZOOM_FIT_HEIGHT,
        ZOOM_AUTO:                      ZOOM_AUTO,
        ZOOM_IN:                        ZOOM_IN,
        ZOOM_OUT:                       ZOOM_OUT,

        SCROLL_PREVIOUS:                SCROLL_PREVIOUS,
        SCROLL_NEXT:                    SCROLL_NEXT,

        LAYOUT_VERTICAL:                LAYOUT_VERTICAL,
        LAYOUT_VERTICAL_SINGLE_COLUMN:  LAYOUT_VERTICAL_SINGLE_COLUMN,
        LAYOUT_HORIZONTAL:              LAYOUT_HORIZONTAL,
        LAYOUT_PRESENTATION:            LAYOUT_PRESENTATION,
        LAYOUT_PRESENTATION_TWO_PAGE:   LAYOUT_PRESENTATION_TWO_PAGE,
        LAYOUT_TEXT:                    LAYOUT_TEXT,

        // The number of times to retry loading an asset before giving up
        ASSET_REQUEST_RETRIES: 1,

        // templates exposed to allow more customization
        viewerTemplate: VIEWER_HTML_TEMPLATE,
        pageTemplate: PAGE_HTML_TEMPLATE,

        // exposed for testing purposes only
        // should not be accessed directly otherwise
        components: components,
        utilities: utilities,

        /**
         * Create and return a viewer instance initialized with the given parameters
         * @param {string|Element|jQuery} el The element to bind the viewer to
         * @param {Object} config            The viewer configuration parameters
         * @returns {Object}                 The viewer instance
         */
        createViewer: function (el, config) {
            return new Crocodoc.Viewer(el, config);
        },

        /**
         * Get a viewer instance by id
         * @param {number} id   The id
         * @returns {Object}    The viewer instance
         */
        getViewer: function (id) {
            return Crocodoc.Viewer.get(id);
        },

        /**
         * Register a new component
         * @param  {string} name      The (unique) name of the component
         * @param  {Array} mixins     Array of component names to instantiate and pass as mixinable objects to the creator method
         * @param  {Function} creator Factory function used to create an instance of the component
         * @returns {void}
         */
        addComponent: function (name, mixins, creator) {
            if (mixins instanceof Function) {
                creator = mixins;
                mixins = [];
            }
            // make sure this component won't cause a circular mixin dependency
            findCircularDependencies(name, mixins);
            components[name] = {
                mixins: mixins,
                creator: creator
            };
        },

        /**
         * Create and return an instance of the named component
         * @param  {string} name The name of the component to create
         * @param  {Crocodoc.Scope} scope The scope object to create the component on
         * @returns {?Object}     The component instance or null if the component doesn't exist
         */
        createComponent: function (name, scope) {
            var component = components[name];

            if (component) {
                var args = [];
                for (var i = 0; i < component.mixins.length; ++i) {
                    args.push(this.createComponent(component.mixins[i], scope));
                }
                args.unshift(scope);
                return component.creator.apply(component.creator, args);
            }

            return null;
        },

        /**
         * Register a new Crocodoc plugin
         * @param  {string} name      The (unique) name of the plugin
         * @param  {Function} creator Factory function used to create an instance of the plugin
         * @returns {void}
         */
        addPlugin: function (name, creator) {
            this.addComponent('plugin-' + name, creator);
        },

        /**
         * Register a new Crocodoc data provider
         * @param {string} modelName The model name this data provider provides
         * @param {Function} creator Factory function used to create an instance of the data provider.
         */
        addDataProvider: function(modelName, creator) {
            this.addComponent('data-provider-' + modelName, creator);
        },

        /**
         * Register a new utility
         * @param  {string} name    The (unique) name of the utility
         * @param  {Function} creator Factory function used to create an instance of the utility
         * @returns {void}
         */
        addUtility: function (name, creator) {
            utilities[name] = {
                creator: creator,
                instance: null
            };
        },

        /**
         * Retrieve the named utility
         * @param {string} name The name of the utility to retrieve
         * @returns {?Object}    The utility or null if the utility doesn't exist
         */
        getUtility: function (name) {
            var utility = utilities[name];

            if (utility) {
                if (!utility.instance) {
                    utility.instance = utility.creator(this);
                }

                return utility.instance;
            }

            return null;
        }
    };
})();
