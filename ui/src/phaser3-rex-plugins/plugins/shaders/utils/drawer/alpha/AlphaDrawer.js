import Drawer from '../Drawer.js';

class AlphaDrawer extends Drawer {
    constructor(postFXPipeline, shader) {
        super(postFXPipeline, shader);

        this.alpha = 1;
    }

    setAlpha(alpha) {
        this.alpha = alpha;
        return this;
    }
    
    // Override
    draw(startFrame, returnLastFrame) {
        var self = this.postFXPipeline;
        var shader = this.shader;

        var sourceFrame = startFrame;
        var targetFrame = this.getAnotherFrame(sourceFrame);
        var returnFrame;

        self.set1f('alpha', this.alpha, shader);
        if (returnLastFrame) {
            self.bindAndDraw(sourceFrame, targetFrame, true, true, shader);
            returnFrame = targetFrame;
        } else{
            self.bindAndDraw(sourceFrame, null, true, true, shader);
        }

        return returnFrame;
    }

}

export default AlphaDrawer;