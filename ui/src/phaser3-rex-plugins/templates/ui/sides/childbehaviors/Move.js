import IndexOf from '../../../../plugins/utils/object/IndexOf.js';
import { GetDisplayWidth, GetDisplayHeight } from '../../../../plugins/utils/size/GetDisplaySize.js';
import { WaitComplete } from '../../utils/WaitEvent.js';

export default {
    moveChild(child, duration, ease, distance) {
        var key;
        if (typeof (child) === 'string') {
            key = child;
            child = this.sizerChildren[key];
        } else {
            key = IndexOf(this.sizerChildren, child);
        }

        if (duration === undefined) {
            duration = 500;
        }

        var isShownChild = (this.currentChildKey === key);

        if (distance === undefined) {
            switch (key) {
                case 'leftSide':
                case 'rightSide':
                    distance = GetDisplayWidth(child);
                    break;
                case 'topSide':
                case 'bottomSide':
                    distance = GetDisplayHeight(child);
                    break;
                default: // 'panel'
                    if (isShownChild) { // Show panel
                        switch (this.previousChildKey) {
                            case 'leftSide':
                            case 'rightSide':
                                distance = GetDisplayWidth(this.sizerChildren[this.previousChildKey]);
                                break;
                            case 'topSide':
                            case 'bottomSide':
                                distance = GetDisplayHeight(this.sizerChildren[this.previousChildKey]);
                                break;
                            default:
                                distance = 0;
                                break;
                        }
                    } else { // Hide panel
                        switch (this.currentChildKey) {
                            case 'leftSide':
                            case 'rightSide':
                                distance = GetDisplayWidth(this.sizerChildren[this.currentChildKey]);
                                break;
                            case 'topSide':
                            case 'bottomSide':
                                distance = GetDisplayHeight(this.sizerChildren[this.currentChildKey]);
                                break;
                            default:
                                distance = 0;
                                break;
                        }
                    }
                    break;
            }
        }

        var moveLeft, moveRight, moveUp, moveDown;
        if (isShownChild) {
            switch (key) {
                case 'panel':
                    switch (this.previousChildKey) {
                        case 'leftSide':
                            moveLeft = true;
                            break;
                        case 'rightSide':
                            moveRight = true;
                            break;
                        case 'topSide':
                            moveUp = true;
                            break;
                        case 'bottomSide':
                            moveDown = true;
                            break;
                    }
                    break;
                case 'leftSide':
                    moveRight = true;
                    break;
                case 'rightSide':
                    moveLeft = true;
                    break;
                case 'topSide':
                    moveDown = true;
                    break;
                case 'bottomSide':
                    moveUp = true;
                    break;
            }
        } else { // Hide
            switch (key) {
                case 'panel':
                    switch (this.currentChildKey) {
                        case 'leftSide':
                            moveRight = true;
                            break;
                        case 'rightSide':
                            moveLeft = true;
                            break;
                        case 'topSide':
                            moveDown = true;
                            break;
                        case 'bottomSide':
                            moveUp = true;
                            break;
                    }
                    break;
                case 'leftSide':
                    moveLeft = true;
                    break;
                case 'rightSide':
                    moveRight = true;
                    break;
                case 'topSide':
                    moveUp = true;
                    break;
                case 'bottomSide':
                    moveDown = true;
                    break;
            }
        }

        if (moveLeft) {
            child.moveTo(duration, `-=${distance}`, undefined, ease);
        } else if (moveRight) {
            child.moveTo(duration, `+=${distance}`, undefined, ease);
        } else if (moveUp) {
            child.moveTo(duration, undefined, `-=${distance}`, ease);
        } else if (moveDown) {
            child.moveTo(duration, undefined, `+=${distance}`, ease);
        } else {
            child.moveTo(0);
        }
        return this;
    },

    moveChildPromise(child, duration, ease, distance) {
        if (typeof (child) === 'string') {
            child = this.sizerChildren[key];
        }
        this.moveChild(child, duration, ease, distance);

        if (child._easeMove) {
            return WaitComplete(child._easeMove);
        } else {
            return Promise.resolve();
        }
    }
}