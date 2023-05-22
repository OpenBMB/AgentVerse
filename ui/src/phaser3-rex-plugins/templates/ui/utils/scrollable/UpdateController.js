var UpdateController = function () {
    var scroller = this.childrenMap.scroller;
    var slider = this.childrenMap.slider;
    if (scroller) {
        scroller.setValue(this.childOY);
    }
    if (slider) {
        slider.setValue(this.t);
    }
}

export default UpdateController;