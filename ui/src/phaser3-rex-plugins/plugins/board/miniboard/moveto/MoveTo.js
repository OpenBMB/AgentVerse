import MoveToTask from '../../../behaviors/moveto/MoveTo.js';
import TickTask from '../../../utils/componentbase/SceneUpdateTickTask.js';

import CanMoveToTile from './CanMoveToTile.js';
import MoveToTile from './MoveToTile.js';
import MoveToward from './MoveToward.js';
import MoveToRandomNeighbor from './MoveToRandomNeighbor.js';

import GetValue from '../../../utils/object/GetValue.js';

class MoveTo extends TickTask {
    constructor(miniBoard, config) {
        super(miniBoard, config);
        // this.parent = miniBoard;

        this.moveToTask = new MoveToTask(miniBoard, { tickingMode: 0 });

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.isRunning = GetValue(o, 'isRunning', false);
        this.setEnable(GetValue(o, 'enable', true));
        this.timeScale = GetValue(o, 'timeScale', 1);
        this.setSpeed(GetValue(o, 'speed', 400));
        this.destinationTileX = GetValue(o, 'destinationTileX', null);
        this.destinationTileY = GetValue(o, 'destinationTileY', null);
        this.destinationDirection = GetValue(o, 'destinationDirection', null);
        this.lastMoveResult = GetValue(o, 'lastMoveResult', undefined);
        return this;
    }

    toJSON() {
        return {
            isRunning: this.isRunning,
            enable: this.enable,
            timeScale: this.timeScale,
            speed: this.speed,
            moveableTest: this.moveableTestCallback,
            moveableTestScope: this.moveableTestScope,
            destinationTileX: this.destinationTileX,
            destinationTileY: this.destinationTileY,
            destinationDirection: this.destinationDirection,
            lastMoveResult: this.lastMoveResult,
            tickingMode: this.tickingMode
        };
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        this.moveToTask.shutdown(fromScene);
        super.shutdown(fromScene);
    }

    set enable(value) {
        this.moveToTask.setEnable(value);
    }

    get enable() {
        return this.moveToTask.enable;
    }

    setEnable(e) {
        if (e == undefined) {
            e = true;
        }
        this.enable = e;
        return this;
    }

    get timeScale() {
        return this.moveToTask.timeScale;
    }

    set timeScale(value) {
        this.moveToTask.timeScale = value;
    }

    set speed(value) {
        this.moveToTask.setSpeed(value);
    }

    get speed() {
        return this.moveToTask.speed;
    }

    setSpeed(speed) {
        this.speed = speed;
        return this;
    }

    moveAlongLine(startX, startY, endX, endY) {
        if (startX !== undefined) {
            this.parent.x = startX;
        }
        if (startY !== undefined) {
            this.parent.y = startY;
        }
        this.moveToTask.moveTo(endX, endY);
        return this;
    };

    update(time, delta) {
        if ((!this.isRunning) || (!this.enable)) {
            return this;
        }

        var moveToTask = this.moveToTask;
        moveToTask.update(time, delta);
        if (!moveToTask.isRunning) {
            this.complete();
            return this;
        }
        return this;
    }
}

var methods = {
    canMoveTo: CanMoveToTile,
    moveTo: MoveToTile,
    moveToward: MoveToward,
    moveToRandomNeighbor: MoveToRandomNeighbor,
};
Object.assign(
    MoveTo.prototype,
    methods
);


export default MoveTo;