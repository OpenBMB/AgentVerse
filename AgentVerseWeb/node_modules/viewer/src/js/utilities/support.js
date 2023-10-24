/**
 * @fileoverview Support utility for feature detection / browser support
 * @author lakenen
 */

Crocodoc.addUtility('support', function () {

    'use strict';
    var prefixes = ['Moz', 'Webkit', 'O', 'ms'],
        xhrSupported = null,
        xhrCORSSupported = null;

    /**
     * Helper function to get the proper vendor property name
     * (`transition` => `WebkitTransition`)
     * @param {string} prop The property name to test for
     * @returns {string|boolean} The vendor-prefixed property name or false if the property is not supported
     */
    function getVendorCSSPropertyName(prop) {
        var testDiv = document.createElement('div'),
            prop_, i, vendorProp;

        // Handle unprefixed versions (FF16+, for example)
        if (prop in testDiv.style) {
            return prop;
        }

        prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);

        if (prop in testDiv.style) {
            return prop;
        }

        for (i = 0; i < prefixes.length; ++i) {
            vendorProp = prefixes[i] + prop_;
            if (vendorProp in testDiv.style) {
                if (vendorProp.indexOf('ms') === 0) {
                    vendorProp = '-' + vendorProp;
                }
                return uncamel(vendorProp);
            }
        }

        return false;
    }

    /**
     * Converts a camelcase string to a dasherized string.
     * (`marginLeft` => `margin-left`)
     * @param {stirng} str The camelcase string to convert
     * @returns {string} The dasherized string
     */
    function uncamel(str) {
        return str.replace(/([A-Z])/g, function(letter) { return '-' + letter.toLowerCase(); });
    }

    return {
        svg: document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1'),
        csstransform: getVendorCSSPropertyName('transform'),
        csstransition: getVendorCSSPropertyName('transition'),
        csszoom: getVendorCSSPropertyName('zoom'),

        /**
         * Return true if XHR is supported
         * @returns {boolean}
         */
        isXHRSupported: function () {
            if (xhrSupported === null) {
                xhrSupported = !!this.getXHR();
            }
            return xhrSupported;
        },

        /**
         * Return true if XHR is supported and is CORS-enabled
         * @returns {boolean}
         */
        isCORSSupported: function () {
            if (xhrCORSSupported === null) {
                xhrCORSSupported = this.isXHRSupported() &&
                                   ('withCredentials' in this.getXHR());
            }
            return xhrCORSSupported;
        },

        /**
         * Return true if XDR is supported
         * @returns {boolean}
         */
        isXDRSupported: function () {
            return typeof window.XDomainRequest !== 'undefined';
        },

        /**
         * Get a XHR object
         * @returns {XMLHttpRequest} An XHR object
         */
        getXHR: function () {
            if (window.XMLHttpRequest) {
                return new window.XMLHttpRequest();
            } else {
                try {
                    return new ActiveXObject('MSXML2.XMLHTTP.3.0');
                }
                catch(ex) {
                    return null;
                }
            }
        },

        /**
         * Get a CORS-enabled request object
         * @returns {XMLHttpRequest|XDomainRequest} The request object
         */
        getXDR: function () {
            if (this.isXDRSupported()) {
                return new window.XDomainRequest();
            }
            return null;
        }
    };
});
