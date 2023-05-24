import RunChildrenWrapBase from '../basesizer/RunWidthWrap.js';
import RunChildrenWrap from './RunChildrenWrap.js';

var RunWidthWrap = function (width) {
    var innerWidth = width - this.space.left - this.space.right;
    this.widthWrapResult = RunChildrenWrap.call(this, innerWidth, this.widthWrapResult);
    RunChildrenWrapBase.call(this, width);
}

export default RunWidthWrap;