import NinePatch from './ninepatch/NinePatch.js';
import NinePatch2 from './ninepatch2/NinePatch.js';
import RoundRectangle from './roundrectangle/RoundRectangle.js';
import StatesRoundRectangle from './statesroundrectangle/StatesRoundRectangle.js';
import RoundRectangleCanvas from './roundrectanglecanvas/RoundRectangleCanvas.js';
import BBCodeText from './bbcodetext/BBCodeText.js';
import TagText from './tagtext/TagText.js';
import DynamicText from './dynamictext/DynamicText.js';
import TextPlayer from './textplayer/TextPlayer.js';
import CanvasInput from './canvasinput/CanvasInput.js';
import HiddenEdit from './hiddenedit/HiddenEdit.js';
import Checkbox from './checkbox/Checkbox.js';
import ToggleSwitch from './toggleswitch/ToggleSwitch.js';

import Canvas from './canvas/Canvas.js';
import CircleMaskImage from './circlemaskimage/CircleMaskImage.js';
import AlphaMaskImage from './alphamaskimage/AlphaMaskImage.js';
import CircularProgress from './circularprogress/CircularProgress.js';
import CircularProgressCanvas from './circularprogresscanvas/CircularProgressCanvas.js';
import LineProgress from './lineprogress/LineProgress.js';
import LineProgressCanvas from './lineprogresscanvas/LineProgressCanvas.js';
import Tirangle from './triangle/Triangle.js';
import Knob from './knob/Knob.js';
import CustomShapes from './customshapes/CustomShapes.js';
import CustomProgress from './customprogress/CustomProgress.js';
import TransitionImage from './transitionimage/TransitionImage.js';
import ImageBox from './imagebox/ImageBox.js';
import FullWindowRectangle from './fullwindowrectangle/FullWindowRectangle.js';
import Cover from './cover/Cover.js';
import InputText from './inputtext/InputText.js';
import { FileChooser } from './filechooser/FileChooser.js';
import FileDropZone from './filedropzone/FileDropZone.js';
import Chart from './chart/Chart.js';

import Container from './container/Container.js';
import Sizer from './sizer/Sizer.js';
import GridSizer from './gridsizer/GridSizer.js';
import FixWidthSizer from './fixwidthsizer/FixWidthSizer.js';
import OverlapSizer from './overlapsizer/OverlapSizer.js';

import Space from './space/Space.js';
import Label from './label/Label.js';
import SimpleLabel from './simplelabel/SimpleLabel.js';
import TitleLabel from './titlelabel/TitleLabel.js';
import NameValueLabel from './namevaluelabel/NameValueLabel.js';
import Buttons from './buttons/Buttons.js';
import GridButtons from './gridbuttons/GridButtons.js';
import FixWidthButtons from './fixwidthbuttons/FixWidthButtons.js';
import FileSelectorButton from './fileselectorbutton/FileSelectorButton.js';
import Dialog from './dialog/Dialog.js';
import ConfirmDialog from './confirmdialog/ConfirmDialog.js';
import HolyGrail from './holygrail/HolyGrail.js';
import Tabs from './tabs/Tabs.js';
import Slider from './slider/Slider.js';
import GridTable from './gridtable/GridTable.js';
import Menu from './menu/Menu.js';
import DropDownList from './dropdownlist/DropDownList.js';
import SimpleDropDownList from './simpledropdownlist/SimpleDropDownList.js';
import TextBox from './textbox/TextBox.js';
import NumberBar from './numberbar/NumberBar.js';
import BadgeLabel from './badgelabel/BadgeLabel.js';
import Pages from './pages/Pages.js';
import PerspectiveCard from './perspectivecard/PerspectiveCard.js';
import TabPages from './tabpages/TabPages.js';
import Folder from './folder/Folder.js';
import TextArea from './textarea/TextArea.js';
import ScrollablePanel from './scrollablepanel/ScrollablePanel.js';
import ScrollBar from './scrollbar/ScrollBar.js';
import Toast from './toast/Toast.js';
import ColorComponents from './colorinput/colorcomponents/ColorComponents.js';
import ColorInput from './colorinput/colorinput/ColorInput.js';
import ColorInputBase from './colorinput/colorinputbase/ColorInputBase.js';
import ColorPicker from './colorinput/colorpicker/ColorPicker.js';
import Tweaker from './tweaker/Tweaker.js';
import Sides from './sides/Sides.js';

import Click from './click/Click.js';
import ClickOutside from './clickoutside/ClickOutside.js';
import InTouching from './intouching/InTouching.js';
import Tap from './tap/Tap.js';
import Press from './press/Press.js';
import Swipe from './swipe/Swipe.js';
import Pan from './pan/Pan.js';
import Drag from './drag/Drag.js';
import Pinch from './pinch/Pinch.js';
import Rotate from './rotate/Rotate.js';
import Flip from './flip/Flip.js';
import Shake from './shake/Shake.js';
import TouchEventStop from './toucheventstop/TouchEventStop.js';
import Perspective from './perspective/Perspective.js';
import Skew from './skew/Skew.js';
import Anchor from './anchor/Anchor.js';
import TextTyping from './texttyping/TextTyping.js';
import TextPage from './textpage/TextPage.js';
import TextEdit from './textedit/TextEdit.js';
import { Fade, FadeIn, FadeOutDestroy } from './fade/Fade.js';
import { EaseMove, EaseMoveTo, EaseMoveFrom } from './easemove/EaseMove.js';
import { Modal, ModalPromise, ModalClose } from './modal/Modal.js';
// import { Maker, YAMLMake as Make } from './maker/index.js';

import { GetParentSizer, GetTopmostSizer } from './utils/GetParentSizer.js';
import IsPointerInBounds from '../../plugins/utils/input/IsPointerInBounds.js';
import {
    Show,
    Hide,
    IsShown,
} from './utils/Hide.js';
import Edit from './textedit/Edit.js';
import WrapExpandText from './utils/wrapexpandtext/WrapExpandText.js';
import FontSizeExpandText from './utils/fontsizeexpandtext/FontSizeExpandText.js';
import SetFontSizeToFitWidth from '../../plugins/utils/text/setfontsizetofitwidth/SetFontSizeToFitWidth.js';
import { WaitEvent, WaitComplete } from './utils/WaitEvent.js';
import DelayPromise from '../../plugins/utils/promise/Delay.js'
import GetViewport from '../../plugins/utils/system/GetViewport.js';
import SetChildrenInteractive from './utils/setchildreninteractive/SetChildrenInteractive.js';
import RequestDrag from '../../plugins/utils/input/RequestDrag.js';
import { OpenFileChooser } from './filechooser/FileChooser.js';

const FontSizeResize = SetFontSizeToFitWidth;

export {
    NinePatch,
    NinePatch2,
    RoundRectangle,
    StatesRoundRectangle,
    RoundRectangleCanvas,
    BBCodeText,
    TagText,
    DynamicText,
    TextPlayer,
    CanvasInput,
    HiddenEdit,
    Checkbox,
    ToggleSwitch,
    Canvas,
    CircleMaskImage,
    AlphaMaskImage,
    FullWindowRectangle,
    Cover,
    InputText,
    FileChooser,
    FileDropZone,
    Chart,
    CircularProgress,
    CircularProgressCanvas,
    LineProgress,
    LineProgressCanvas,
    Tirangle,
    Knob,
    CustomShapes,
    CustomProgress,
    TransitionImage,
    ImageBox,

    Container,
    Sizer,
    GridSizer,
    FixWidthSizer,
    OverlapSizer,

    Space,
    Label,
    SimpleLabel,
    TitleLabel,
    NameValueLabel,
    Buttons,
    GridButtons,
    FixWidthButtons,
    FileSelectorButton,
    Dialog,
    ConfirmDialog,
    HolyGrail,
    Tabs,
    Slider,
    GridTable,
    Menu,
    DropDownList,
    SimpleDropDownList,
    TextBox,
    NumberBar,
    BadgeLabel,
    Pages,
    PerspectiveCard,
    TabPages,
    Folder,
    TextArea,
    ScrollablePanel,
    ScrollBar,
    Toast,
    ColorComponents,
    ColorInput,
    ColorInputBase,
    ColorPicker,
    Tweaker,
    Sides,

    Click,
    ClickOutside,
    InTouching,
    Tap,
    Press,
    Swipe,
    Pan,
    Drag,
    Pinch,
    Rotate,
    Flip,
    Shake,
    TouchEventStop,
    Perspective,
    Skew,
    Anchor,
    TextTyping,
    TextPage,
    TextEdit,
    Fade, FadeIn, FadeOutDestroy,
    EaseMove, EaseMoveTo, EaseMoveFrom,
    Modal, ModalPromise, ModalClose,
    // Maker, Make,

    GetParentSizer,
    GetTopmostSizer,
    IsPointerInBounds,
    Show,
    Hide,
    IsShown,
    Edit,
    WrapExpandText,
    FontSizeExpandText,
    FontSizeResize,  // Backward compatibility
    SetFontSizeToFitWidth,
    WaitEvent,
    WaitComplete,
    DelayPromise,
    GetViewport,
    SetChildrenInteractive,
    RequestDrag,
    OpenFileChooser,
}