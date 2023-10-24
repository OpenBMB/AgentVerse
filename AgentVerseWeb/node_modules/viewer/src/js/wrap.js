(function (window) {
    /*global jQuery*/
    /*jshint unused:false, undef:false*/
    'use strict';
    window.Crocodoc = (function(fn) {
        if (typeof exports === 'object') {
            // nodejs / browserify - export a function that accepts a jquery impl
            module.exports = fn;
        } else {
            // normal browser environment
            return fn(jQuery);
        }
    }(function($) {

//__crocodoc_viewer__

        return Crocodoc;
    }));
})(typeof window !== 'undefined' ? window : this);
