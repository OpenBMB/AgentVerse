import GetValueFromAlias from '../../utils/object/GetValueFromAliasKeys.js';
import GetViewport from '../../utils/system/GetViewport.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var SetPosition = function (gameObject, config) {
    var expandDirection = GetValue(config, 'expandDirection', undefined);
    if (typeof (expandDirection) === 'string') {
        expandDirection = ExpandDirections[expandDirection];
    }
    var alignTargetX = GetValueFromAlias(config, 'alignTarget', 'alignTargetX');
    var alignTargetY = GetValue(config, 'alignTargetY', alignTargetX);
    var alignOffsetX = GetValue(config, 'alignOffsetX', 0);
    var alignOffsetY = GetValue(config, 'alignOffsetY', 0);
    var alignSide = GetValue(config, 'alignSide', '');
    var alignRight = alignSide.includes('right');

    var positionBounds = GetValue(config, 'bounds');

    // Expand direction
    var isExpandDown = (expandDirection === 0);
    var isExpandUp = (expandDirection === 1);
    var flexExpand = !isExpandDown && !isExpandUp;

    var originX = (alignRight) ? 1 : 0;
    var originY = (isExpandDown || flexExpand) ? 0 : 1;
    gameObject.setOrigin(originX, originY);

    var x, y;
    if (alignRight) {
        x = alignTargetX.getTopRight().x;
    } else {
        x = alignTargetX.getTopLeft().x;
    }

    y = alignTargetY.getBottomLeft().y;
    gameObject.setPosition(
        x + alignOffsetX,
        y + alignOffsetY
    );

    var bounds = positionBounds;
    if (!bounds) {
        bounds = GetViewport(gameObject.scene);
    }

    if (flexExpand && (gameObject.getBottomLeft().y > bounds.bottom)) {
        // Out of bounds, can't put list-panel below parent
        y = alignTargetY.getTopLeft().y;
        gameObject
            .setOrigin(0, 1)
            .setPosition(
                x + alignOffsetX,
                y + alignOffsetY
            );
    }

}

const ExpandDirections = {
    down: 0,
    up: 1
}

export default SetPosition;