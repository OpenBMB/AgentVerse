import Carousel from "../carousel/Carousel";

export default ImageCarousel;

declare namespace ImageCarousel {

    interface IConfig {
        x?: number,
        y?: number,

        images?: ({ key: string, frame?: string })[],
        index?: number,
        rtl?: boolean,
        repeat?: boolean,

        width?: number,
        height?: number,
        faceCount?: number,

        z?: number,
        zEnd?: number,

        roll?: Carousel.IConfigRoll | false,
    }

    namespace Events {
        type RollCompleteCallbackType = () => void;
    }
}

declare class ImageCarousel extends Carousel {
    constructor(
        scene: Phaser.Scene,
        config?: ImageCarousel.IConfig
    );
}