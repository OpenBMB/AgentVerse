import AddChess from './chess/AddChess.js';
import RemoveChess from './chess/RemoveChess.js';
import RemoveAllChess from './chess/RemoveAllChess.js';

import SetMainBoard from './mainboard/SetMainboard.js';
import CanPutOnMainBoard from './mainboard/CanPutOnMainBoard.js';
import PutOnMainBoard from './mainboard/PutOnMainBoard.js';
import PullOutFromMainBoard from './mainboard/PullOutFromMainBoard.js';
import PutBack from './mainboard/PutBack.js';
import IsOverlapping from './mainboard/IsOverlapping.js';
import AlignToMainBoard from './mainboard/AlignToMainBoard.js';

import SetInteractive from './input/SetInteractive.js';
import SetDraggable from './input/SetDraggable.js';
import DragEnd from './input/DragEnd.js';

import CanMirror from './transform/CanMirror.js';
import Mirror from './transform/Mirror.js';
import CanRotate from './transform/CanRotate.js';
import Rotate from './transform/Rotate.js';
import CanRotateTo from './transform/CanRotateTo.js';
import RotateTo from './transform/RotateTo.js';
import SetOrigin from './transform/SetOrigin.js';

export default {
    addChess: AddChess,
    removeChess: RemoveChess,
    removeAllChess: RemoveAllChess,

    pullOutFromMainBoard: PullOutFromMainBoard,
    canPutOnMainBoard: CanPutOnMainBoard,
    putOnMainBoard: PutOnMainBoard,
    putBack: PutBack,
    isOverlapping: IsOverlapping,
    alignToMainBoard: AlignToMainBoard,

    setInteractive: SetInteractive,
    setDraggable: SetDraggable,
    dragEnd: DragEnd,

    setMainBoard: SetMainBoard,
    canMirror: CanMirror,
    mirror: Mirror,
    canRotate: CanRotate,
    rotate: Rotate,
    canRotateTo: CanRotateTo,
    rotateTo: RotateTo,
    setOrigin: SetOrigin
};