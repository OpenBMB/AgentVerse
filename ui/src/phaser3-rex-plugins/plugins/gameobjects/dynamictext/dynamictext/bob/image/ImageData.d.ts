import RenderBase from '../renderbase/RenderBase';

export default class ImageData extends RenderBase {
    readonly type: 'image';

    setTexture(key: string, frame?: string | null): this;
    key: string;
    frame: string | null;

    readonly frameWidth: number;
    readonly frameHeight: number;

}