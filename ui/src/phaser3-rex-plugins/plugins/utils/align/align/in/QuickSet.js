import ALIGN_CONST from '../const.js';
import BottomCenter from './BottomCenter.js';
import BottomLeft from './BottomLeft.js';
import BottomRight from './BottomRight.js';
import Center from './Center.js';
import LeftCenter from './LeftCenter.js';
import RightCenter from './RightCenter.js';
import TopCenter from './TopCenter.js';
import TopLeft from './TopLeft.js';
import TopRight from './TopRight.js';

var AlignInMap = [];

AlignInMap[ALIGN_CONST.BOTTOM_CENTER] = BottomCenter;
AlignInMap[ALIGN_CONST.BOTTOM_LEFT] = BottomLeft;
AlignInMap[ALIGN_CONST.BOTTOM_RIGHT] = BottomRight;
AlignInMap[ALIGN_CONST.CENTER] = Center;
AlignInMap[ALIGN_CONST.LEFT_CENTER] = LeftCenter;
AlignInMap[ALIGN_CONST.RIGHT_CENTER] = RightCenter;
AlignInMap[ALIGN_CONST.TOP_CENTER] = TopCenter;
AlignInMap[ALIGN_CONST.TOP_LEFT] = TopLeft;
AlignInMap[ALIGN_CONST.TOP_RIGHT] = TopRight;

var QuickSet = function (child, alignIn, position, offsetX, offsetY) {
    return AlignInMap[position](child, alignIn, offsetX, offsetY);
};

export default QuickSet;
