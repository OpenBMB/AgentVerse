import Press from '../../../input/gestures/press/Press.js';
import EmitChessEvent from './EmitChessEvent.js';

var InstallPress = function () {
    var touchZone = (this.touchZone) ? this.touchZone : this.board.scene;
    var press = new Press(touchZone);
    press
        .on('pressstart', OnPressStart, this)
        .on('pressend', OnPressEnd, this);

    return press;
}

var OnPressStart = function (press) {
    var board = this.board;
    // Get touched tileX, tileY
    var tileXY = board.worldXYToTileXY(press.worldX, press.worldY);
    var tileX = tileXY.x,
        tileY = tileXY.y;
    if (!board.contains(tileX, tileY)) {
        return;
    }

    board.emit('tilepressstart', press, tileXY);

    EmitChessEvent(
        'gameobjectpressstart',
        'board.pressstart',
        board, tileX, tileY,
        press
    );
}

var OnPressEnd = function (press) {
    var board = this.board;
    // Get touched tileX, tileY
    var tileXY = board.worldXYToTileXY(press.worldX, press.worldY);
    var tileX = tileXY.x,
        tileY = tileXY.y;
    if (!board.contains(tileX, tileY)) {
        return;
    }

    board.emit('tilepressend', press, tileXY);

    EmitChessEvent(
        'gameobjectpressend',
        'board.pressend',
        board, tileX, tileY,
        press
    );
}

export default InstallPress;