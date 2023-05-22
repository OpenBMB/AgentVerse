import SCROLLMODE from './ScrollModeConst.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var GetScrollMode = function (config, key) {
    var scrollMode = GetValue(config, 'scrollMode', 0); // Vertical
    if (typeof (scrollMode) === 'string') {
        scrollMode = SCROLLMODE[scrollMode];
    }
    return scrollMode;
}
export default GetScrollMode;