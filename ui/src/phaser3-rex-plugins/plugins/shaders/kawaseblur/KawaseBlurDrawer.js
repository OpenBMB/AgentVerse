import Drawer from '../utils/drawer/Drawer.js';

class KawaseBlurDrawer extends Drawer {
    draw(startFrame, returnLastFrame) {
        var self = this.postFXPipeline;
        var shader = this.shader;

        var sourceFrame = startFrame;
        var targetFrame = this.getAnotherFrame(sourceFrame);
        var returnFrame;

        var uvX = self.pixelWidth / self.renderer.width;
        var uvY = self.pixelHeight / self.renderer.height;
        var offset, uOffsetX, uOffsetY;
        for (var i = 0, last = self._quality - 1; i <= last; i++) {
            // Set uniforms
            offset = self._kernels[i] + 0.5;
            uOffsetX = offset * uvX;
            uOffsetY = offset * uvY;
            self.set2f('uOffset', uOffsetX, uOffsetY, shader);
            // Bind and draw
            if (i < last) {
                self.bindAndDraw(sourceFrame, targetFrame, true, true, shader);
                sourceFrame = targetFrame;
                targetFrame = this.getAnotherFrame(sourceFrame);
            } else { // Last step
                if (returnLastFrame) {
                    self.bindAndDraw(sourceFrame, targetFrame, true, true, shader);
                    returnFrame = targetFrame;
                } else {
                    self.bindAndDraw(sourceFrame, null, true, true, shader);
                }
            }
        }

        return returnFrame;
    }
}

export default KawaseBlurDrawer;