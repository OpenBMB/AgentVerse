import RenderBase from '../renderbase/RenderBase.js';
import { SpaceTypeName } from '../Types.js';

class Space extends RenderBase {
    constructor(
        parent,
        width
    ) {
        super(parent, SpaceTypeName);
        this.setSpaceWidth(width);
    }

    get width() {
        return this.spaceWidth * this.scaleX;
    }

    set width(value) {
        if (this.spaceWidth > 0) {
            this.scaleX = value / this.spaceWidth;
        } else {
            this.scaleX = 1;
        }
    }

    setSpaceWidth(width) {
        this.spaceWidth = width;
        return this;
    }

}

export default Space;