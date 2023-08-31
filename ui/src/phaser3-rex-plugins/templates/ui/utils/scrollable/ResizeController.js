import ResizeGameObject from '../../../../plugins/utils/size/ResizeGameObject.js';
import Sizer from '../../sizer/Sizer.js';

var ResizeController = function () {
    var topChildOY = this.topChildOY;
    var bottomChildOY = this.bottomChildOY;
    var scroller = this.childrenMap.scroller;
    var slider = this.childrenMap.slider;
    if (scroller) {
        scroller.setBounds(bottomChildOY, topChildOY);
    }
    if (slider) {
        slider.setEnable(bottomChildOY !== topChildOY);
    }
    this.updateController();

    if (slider) {
        if (this.hideUnscrollableSlider) {
            this.setChildVisible(slider, this.isOverflow);
        }

        if (this.adaptThumbSizeMode) {
            AdaptThumbSize.call(this);
        }
    }

    return this;
}

var AdaptThumbSize = function () {
    // Change slider size according to visible ratio
    var ratio = Math.min(this.childVisibleHeight / this.childHeight, 1);
    var slider = this.childrenMap.slider;
    var track = slider.childrenMap.track;
    var thumb = slider.childrenMap.thumb;
    var minThumbSize = this.minThumbSize;
    if (this.scrollMode === 0) {
        var newHeight = track.displayHeight * ratio;
        if ((minThumbSize !== undefined) && (newHeight < minThumbSize)) {
            newHeight = minThumbSize;
        }
        ResizeGameObject(thumb, undefined, newHeight);
    } else {
        var newWidth = track.displayWidth * ratio;
        if ((minThumbSize !== undefined) && (newWidth < minThumbSize)) {
            newWidth = minThumbSize;
        }
        ResizeGameObject(thumb, newWidth, undefined);

    }
    LayoutSlider.call(this);
}

var LayoutSlider = function () {
    var slider = this.childrenMap.slider;
    // Save minSize
    var minWidthSave = slider.minWidth;
    var minHeightSave = slider.minHeight;
    // Set minSize to current size
    slider.minWidth = slider.width;
    slider.minHeight = slider.height;
    // Layout slider
    slider.layout();
    // Restore minSize
    slider.minWidth = minWidthSave;
    slider.minHeight = minHeightSave;
}

export default ResizeController;