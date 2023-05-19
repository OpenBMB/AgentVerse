import RenderBase from '../renderbase/RenderBase';

export default class InnerBounds extends RenderBase {
    readonly type: 'innerbounds';

    setColor(
        color?: string | number | null,
        color2?: string | number | null,
        isHorizontalGradient?: boolean
    ): this;

    setStroke(
        color?: string | number | null,
        lineWidth?: number
    ): this;

}