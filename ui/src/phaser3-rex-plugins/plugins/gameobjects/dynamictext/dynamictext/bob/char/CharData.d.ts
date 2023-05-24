import RenderBase from '../renderbase/RenderBase';

export default class CharData extends RenderBase {
    readonly type: 'text';

    readonly textWidth: number;
    readonly textHeight: number;
    readonly ascent: number;
    readonly descent: number;

}