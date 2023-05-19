import RenderBase from '../renderbase/RenderBase';

export default class Drawer extends RenderBase {
    readonly type: 'drawer';

    setRenderCallback(callback?: (this: Drawer) => void): this;

    setDrawerSize(isAllSize: true): this;
    setDrawerSize(width?: number, height?: number): this;
    readonly drawerWidth: number;
    readonly drawerHeight: number;

}