export default {
    setThumbPosition(left, right) {
        if (right === undefined) {
            right = 1 - left;
        }

        this.thumbLeftX = left;
        this.thumbRightX = right;
        return this;
    },

    setRTL(rtl) {
        if (rtl === undefined) {
            rtl = true;
        }
        this.rtl = rtl;
        return this;
    }
}