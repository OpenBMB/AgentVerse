import ObjectFactory from './ObjectFactory.js';

import NinePatchFactory from './ninepatch/Factory.js';
import NinePatch2Factory from './ninepatch2/Factory.js';
import RoundRectangleFactory from './roundrectangle/Factory.js';
import StatesRoundRectangleFactory from './statesroundrectangle/Factory.js';
import RoundRectangleCanvasFactory from './roundrectanglecanvas/Factory.js';
import BBCodeTextFactory from './bbcodetext/Factory.js';
import TagTextFactory from './tagtext/Factory.js';
import DynamicTextFactory from './dynamictext/Factory.js';
import TextPlayerFactory from './textplayer/Factory.js';
import CanvasInputFactory from './canvasinput/Factory.js';
import HiddenEditFactory from './hiddenedit/Factory.js';
import CheckboxFactory from './checkbox/Factory.js';
import ToggleSwitchFactory from './toggleswitch/Factory.js';
import CanvasFactory from './canvas/Factory.js';
import CircleMaskImageFactory from './circlemaskimage/Factory.js';
import AlphaMaskImageFactory from './alphamaskimage/Factory.js';
import CircularProgressFactory from './circularprogress/Factory.js';
import CircularProgressCanvasFactory from './circularprogresscanvas/Factory.js';
import LineProgressFactory from './lineprogress/Factory.js';
import LineProgressCanvasFactory from './lineprogresscanvas/Factory.js';
import TriangleFactory from './triangle/Factory.js';
import KnobFactory from './knob/Factory.js';
import CustomShapesFactory from './customshapes/Factory.js';
import CustomProgressFactory from './customprogress/Factory.js';
import TransitionImageFactory from './transitionimage/Factory.js';
import ImageBoxFactory from './imagebox/Factory.js';
import FullWindowRectangleFactory from './fullwindowrectangle/Factory.js';
import CoverFactory from './cover/Factory.js';
import InputTextFactory from './inputtext/Factory';
import FileChooserFactory from './filechooser/Factory.js';
import FileDropZoneFactory from './filedropzone/Factory.js';
import ChartFactory from './chart/Factory.js';

import ContainerFactory from './container/Factory.js';
import SizerFactory from './sizer/Factory.js';
import GridSizerFactory from './gridsizer/Factory.js';
import FixWidthSizerFactory from './fixwidthsizer/Factory.js';
import OverlapSizerFactory from './overlapsizer/Factory.js';

import SpaceFactory from './space/Factory.js';
import LabelFactory from './label/Factory.js';
import SimpleLabelFactory from './simplelabel/Factory.js';
import TitleLabelFactory from './titlelabel/Factory.js';
import NameValueLabelFactory from './namevaluelabel/Factory.js';
import ButtonsFactory from './buttons/Factory.js';
import GridButtonsFactory from './gridbuttons/Factory.js';
import FixWidthButtonsFactory from './fixwidthbuttons/Factory.js';
import FileSelectorButtonFactory from './fileselectorbutton/Factory.js';
import DialogFactory from './dialog/Factory.js';
import ConfirmDialogFactory from './confirmdialog/Factory.js';
import HolyGrailFactory from './holygrail/Factory.js';
import TabsFactory from './tabs/Factory.js';
import SliderFactory from './slider/Factory.js';
import GridTableFactory from './gridtable/Factory.js';
import MenuFactory from './menu/Factory.js';
import DropDownListFactory from './dropdownlist/Factory.js';
import SimpleDropDownListFactory from './simpledropdownlist/Factory.js';
import TextBoxFactory from './textbox/Factory.js';
import NumberBarFactory from './numberbar/Factory.js';
import ScrollBarFactory from './scrollbar/Factory.js';
import BadgeLabelFactory from './badgelabel/Factory.js';
import PagesFactory from './pages/Factory.js';
import PerspectiveCardFactory from './perspectivecard/Factory.js';
import TabPagesFactory from './tabpages/Factory.js';
import FolderFactory from './folder/Factory.js';
import TextAreaFactory from './textarea/Factory.js';
import ScrollablePanelFactory from './scrollablepanel/Factory.js';
import ToastFactory from './toast/Factory.js';
import ColorInputFactory from './colorinput/colorinput/Factory.js';
import ColorInputLiteFactory from './colorinput/colorinputbase/Factory.js';
import ColorPickerFactory from './colorinput/colorpicker/Factory.js';
import ColorComponentsFactory from './colorinput/colorcomponents/Factory.js';
import SidesFactory from './sides/Factory.js';
import TweakerFactory from './tweaker/Factory.js';
// import MakerFactory from './maker/Factory.js';

import ClickFactory from './click/Factory.js';
import ClickOutsideFactory from './clickoutside/Factory.js';
import InTouchingFactory from './intouching/Factory.js';
import TapFactory from './tap/Factory.js';
import PressFactory from './press/Factory.js';
import SwipeFactory from './swipe/Factory.js';
import PanFactory from './pan/Factory.js';
import DragFactory from './drag/Factory.js';
import PinchFactory from './pinch/Factory.js';
import RotateFactory from './rotate/Factory.js';
import FlipFactory from './flip/Factory.js';
import ShakeFactory from './shake/Factory.js';
import TouchEventStopFactory from './toucheventstop/Factory.js';
import PerspectiveFactory from './perspective/Factory.js';
import SkewFactory from './skew/Factory.js';
import AnchorFactory from './anchor/Factory.js';
import TextTypingFactory from './texttyping/Factory.js';
import TextPageFactory from './textpage/Factory.js';
import TextEditFactory from './textedit/Factory.js';

import { GetParentSizer, GetTopmostSizer } from './utils/GetParentSizer.js';
import IsPointerInBounds from '../../plugins/utils/input/IsPointerInBounds.js';
import { Show, Hide, IsShown, } from './utils/Hide.js';
import Edit from './textedit/Edit.js';
import WrapExpandText from './utils/wrapexpandtext/WrapExpandText.js';
import FontSizeExpandText from './utils/fontsizeexpandtext/FontSizeExpandText.js';
import SetFontSizeToFitWidth from '../../plugins/utils/text/setfontsizetofitwidth/SetFontSizeToFitWidth.js';
import { WaitEvent, WaitComplete } from './utils/WaitEvent.js';
import Delay from '../../plugins/utils/promise/Delay.js';
import GetViewport from '../../plugins/utils/system/GetViewport.js';
import SetChildrenInteractive from './utils/setchildreninteractive/SetChildrenInteractive.js';
import { FadeIn, FadeOutDestroy } from './fade/Fade.js';
import { EaseMoveTo, EaseMoveFrom } from './easemove/EaseMove.js'
import { Modal, ModalPromise, ModalClose } from './modal/Modal.js';
import RequestDrag from '../../plugins/utils/input/RequestDrag.js';
import { OpenFileChooser } from './filechooser/FileChooser.js';


class UIPlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager) {
        super(scene, pluginManager);

        this.add = new ObjectFactory(scene);
    }

    start() {
        var eventEmitter = this.scene.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    isInTouching(gameObject, pointer, preTest, postTest) {
        if (!gameObject.visible) {
            return false;
        }
        return IsPointerInBounds(gameObject, pointer, preTest, postTest);
    }

    get viewport() {
        return GetViewport(this.scene, this.scene.cameras.main, true);
    }

    // make(data, view, styles, customBuilders) {
    //     return Make(this.scene, data, view, styles, customBuilders);
    // }

    //get maker() {
    //    if (!this._maker) {
    //        this._maker = new Maker(this.scene);
    //    }
    //    return this._maker;
    //}

}

var methods = {
    getParentSizer: GetParentSizer,
    getTopmostSizer: GetTopmostSizer,
    hide: Hide,
    show: Show,
    isShown: IsShown,
    edit: Edit,
    wrapExpandText: WrapExpandText,
    fontSizeExpandText: FontSizeExpandText,
    fontSizeResize: SetFontSizeToFitWidth,  // Backward compatibility
    setFontSizeToFitWidth: SetFontSizeToFitWidth,
    waitEvent: WaitEvent,
    waitComplete: WaitComplete,
    delayPromise: Delay,
    setChildrenInteractive: SetChildrenInteractive,
    fadeIn: FadeIn,
    fadeOutDestroy: FadeOutDestroy,
    easeMoveTo: EaseMoveTo,
    easeMoveFrom: EaseMoveFrom,
    modal: Modal,
    modalPromise: ModalPromise,
    modalClose: ModalClose,
    requestDrag: RequestDrag,
    openFileChooser: OpenFileChooser,
}

Object.assign(
    UIPlugin.prototype,
    methods
);


export default UIPlugin;