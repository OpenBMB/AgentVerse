class Drawer {
    constructor(postFXPipeline, shader) {
        this.postFXPipeline = postFXPipeline;
        this.shader = shader;
    }

    getAnotherFrame(frame) {
        var self = this.postFXPipeline;
        var frame1 = self.fullFrame1,
            frame2 = self.fullFrame2;
        return (frame === frame1) ? frame2 : frame1;
    }

    init(renderTarget, startFrame) {
        var self = this.postFXPipeline;
        if (startFrame === undefined) {
            startFrame = self.fullFrame1;
        }

        self.copyFrame(renderTarget, startFrame);
        return startFrame;
    }

    // Override
    draw(startFrame, returnLastFrame) {
        // var self = this.postFXPipeline;
        // var shader = this.shader;

        // var sourceFrame = startFrame;
        // var targetFrame = this.getAnotherFrame(sourceFrame);
        // var returnFrame;

        // ...

        // return returnFrame;
    }


}

export default Drawer;