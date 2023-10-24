/**
 * @fileoverview layout-text component definition
 * @author lakenen
 */

/**
 * Layout for text-based files
 */
Crocodoc.addComponent('layout-' + LAYOUT_TEXT, ['layout-base'], function (scope, base) {
    'use strict';

    var util = scope.getUtility('common');

    return base.extend({
        init: function () {
            base.init.call(this);
            this.zoomLevels = this.config.zoomLevels.slice();
            this.minZoom = this.zoomLevels[0];
            this.maxZoom = this.zoomLevels[this.zoomLevels.length - 1];
        },

        setZoom: function (val) {
            var z,
                zoomState = this.state.zoomState,
                currentZoom = zoomState.zoom;

            if (typeof val === 'string') {
                z = this.calculateNextZoomLevel(val);
                if (!z) {
                    if (val === 'auto' || val === 'fitwidth' || val === 'fitheight') {
                        z = 1;
                    } else {
                        z = currentZoom;
                    }
                }
            } else {
                z = parseFloat(val) || currentZoom;
            }

            z = util.clamp(z, this.minZoom, this.maxZoom);
            this.config.$doc.css('font-size', (z * 10) + 'pt');

            zoomState.prevZoom = currentZoom;
            zoomState.zoom = z;
            zoomState.canZoomIn = this.calculateNextZoomLevel(Crocodoc.ZOOM_IN) !== false;
            zoomState.canZoomOut = this.calculateNextZoomLevel(Crocodoc.ZOOM_OUT) !== false;

            scope.broadcast('zoom', util.extend({
                isDraggable: this.isDraggable()
            }, zoomState));
        }
    });
});
