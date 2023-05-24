import RenderBase from '../renderbase/RenderBase';

export default class Space extends RenderBase {
    readonly type: 'space';

    setSpaceWidth(width: number): this;
    spaceWidth: number;
}