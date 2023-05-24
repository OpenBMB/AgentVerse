import Tap from '../../../input/gestures/tap/Tap.js';
import EmitChessEvent from './EmitChessEvent.js';

var InstallTap = function () {
    var touchZone = (this.touchZone) ? this.touchZone : this.board.scene;
    var tap = new Tap(touchZone);
    tap.on('tap', OnTap, this);
    return tap;
}

var OnTap = function (tap) {
    var board = this.board;
    // Get touched tileX, tileY
    var tileXY = board.worldXYToTileXY(tap.worldX, tap.worldY);
    var tileX = tileXY.x,
        tileY = tileXY.y;
    if (!board.contains(tileX, tileY)) {
        return;
    }

    board.emit('tiletap', tap, tileXY);
    board.emit(`tile${tap.tapsCount}tap`, tap, tileXY);

    var boardEventCallback = function (gameObject) {
        board.emit('gameobjecttap', tap, gameObject);
        board.emit(`gameobject${tap.tapsCount}tap`, tap, gameObject);
    }
    var chessEventCallback = function (gameObject) {
        gameObject.emit('board.tap', tap);
        gameObject.emit(`board.${tap.tapsCount}tap`, tap);
    }
    EmitChessEvent(
        boardEventCallback,
        chessEventCallback,
        board, tileX, tileY, 
        tap
    );
}

export default InstallTap;