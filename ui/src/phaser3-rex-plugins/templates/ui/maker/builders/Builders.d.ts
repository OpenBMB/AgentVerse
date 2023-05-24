import BBCodeText from '../../bbcodetext/BBCodeText';
import RoundRectangle from '../../roundrectangle/RoundRectangle';
import NinePatch from '../../ninepatch/NinePatch';
import NinePatch2 from '../../ninepatch2/NinePatch';
import Canvas from '../../canvas/Canvas';
import CircleMaskImage from '../../circlemaskimage/CircleMaskImage';
import Space from '../../space/Space';

import Sizer from '../../sizer/Sizer';
import FixWidthSizer from '../../fixwidthsizer/FixWidthSizer';
import GridSizer from '../../gridsizer/GridSizer';
import OverlapSizer from '../../overlapsizer/OverlapSizer';

import Buttons from '../../buttons/Buttons';
import FixWidthButtons from '../../fixwidthbuttons/FixWidthButtons';
import GridButtons from '../../gridbuttons/GridButtons';

import Label from '../../label/Label';
import BadgeLabel from '../../badgelabel/BadgeLabel';
import Dialog from '../../dialog/Dialog';
import TextBox from '../../textbox/TextBox';
import Slider from '../../slider/Slider';
import NumberBar from '../../numberbar/NumberBar';
import ScrollBar from '../../scrollbar/ScrollBar';
import TextArea from '../../textarea/TextArea';
import Pages from '../../pages/Pages';
import Toast from '../../toast/Toast';
import Knob from '../../knob/Knob';
import HolyGrail from '../../holygrail/HolyGrail';
import Menu from '../../menu/Menu';

export default Builders;

declare namespace Builders {
    type BuilderTypeCommon<T> = (
        scene: Phaser.Scene,
        data: Object,
        view: Object,
        styles: Object,
        customBuilders: { [name: string]: BuilderType }
    ) => T;

    type BuilderType = BuilderTypeCommon<Phaser.GameObjects.GameObject>;
}

declare var Builders: {
    Image: Builders.BuilderTypeCommon<Phaser.GameObjects.Image>,
    Sprite: Builders.BuilderTypeCommon<Phaser.GameObjects.Sprite>,
    Video: Builders.BuilderTypeCommon<Phaser.GameObjects.Video>,
    Text: Builders.BuilderTypeCommon<Phaser.GameObjects.Text>,
    BBCodeText: Builders.BuilderTypeCommon<BBCodeText>,
    RoundRectangle: Builders.BuilderTypeCommon<RoundRectangle>,
    Ninepatch: Builders.BuilderTypeCommon<NinePatch>,
    Ninepatch2: Builders.BuilderTypeCommon<NinePatch2>,
    Canvas: Builders.BuilderTypeCommon<Canvas>,
    CircleMaskImage: Builders.BuilderTypeCommon<CircleMaskImage>,
    Space: Builders.BuilderTypeCommon<Space>,

    Sizer: Builders.BuilderTypeCommon<Sizer>,
    FixWidthSizer: Builders.BuilderTypeCommon<FixWidthSizer>,
    GridSizer: Builders.BuilderTypeCommon<GridSizer>,
    OverlapSizer: Builders.BuilderTypeCommon<OverlapSizer>,

    Buttons: Builders.BuilderTypeCommon<Buttons>,
    FixWidthButtons: Builders.BuilderTypeCommon<FixWidthButtons>,
    GridButtons: Builders.BuilderTypeCommon<GridButtons>,

    Label: Builders.BuilderTypeCommon<Label>,
    BadgeLabel: Builders.BuilderTypeCommon<BadgeLabel>,
    Dialog: Builders.BuilderTypeCommon<Dialog>,
    TextBox: Builders.BuilderTypeCommon<TextBox>,
    Slider: Builders.BuilderTypeCommon<Slider>,
    NumberBar: Builders.BuilderTypeCommon<NumberBar>,
    ScrollBar: Builders.BuilderTypeCommon<ScrollBar>,
    TextArea: Builders.BuilderTypeCommon<TextArea>,
    Pages: Builders.BuilderTypeCommon<Pages>,
    Toast: Builders.BuilderTypeCommon<Toast>,
    Knob: Builders.BuilderTypeCommon<Knob>,
    HolyGrail: Builders.BuilderTypeCommon<HolyGrail>,
    Menu: Builders.BuilderTypeCommon<Menu>,

}