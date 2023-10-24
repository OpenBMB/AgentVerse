/**
 * @fileoverview layout-vertical-single-column component definition
 * @author lakenen
 */

/**
 * The vertical-single-column layout
 */
Crocodoc.addComponent('layout-' + LAYOUT_VERTICAL_SINGLE_COLUMN, ['layout-' + LAYOUT_VERTICAL], function (scope, vertical) {

    'use strict';

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    // there is nothing different about this layout aside from the name (and CSS class name)
    // so we can just return the vertical layout
    return vertical;
});
