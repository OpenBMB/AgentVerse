import CreateImage from './CreateImage.js';
import CreateSprite from './CreateSprite.js';
import CreateVideo from './CreateVideo.js';
import CreateText from './CreateText.js';
import CreateBBCodeText from './CreateBBCodeText.js';
import CreateRoundRectangle from './CreateRoundRectangle.js';
import CreateNinePatch from './CreateNinePatch.js';
import CreateNinePatch2 from './CreateNinePatch2.js';
import CreateCanvas from './CreateCanvas.js';
import CreateCircleMaskImage from './CreateCircleMaskImage.js';
import CreateSpace from './CreateSpace.js';

import CreateSizer from './CreateSizer.js';
import CreateFixWidthSizer from './CreateFixWidthSizer.js';
import CreateGridSizer from './CreateGridSizer.js';
import CreateOverlapSizer from './CreateOverlapSizer.js';

import CreateButtons from './CreateButtons.js';
import CreateFixWidthButtons from './CreateFixWidthButtons.js';
import CreateGridButtons from './CreateGridButtons.js';

import CreateLabel from './CreateLabel.js';
import CreateBadgeLabel from './CreateBadgeLabel.js';
import CreateDialog from './CreateDialog.js';
import CreateTextBox from './CreateTextBox.js';
import CreateSlider from './CreateSlider.js';
import CreateNumberBar from './CreateNumberBar.js';
import CreateScrollBar from './CreateScrollBar.js';
import CreateTextArea from './CreateTextArea.js';
import CreatePages from './CreatePages.js';
import CreateToast from './CreateToast.js';
import CreateKnob from './CreateKnob.js';
import CreateHolyGrail from './CreateHolyGrail.js';
import CreateMenu from './CreateMenu.js';

var Builders = {
    Image: CreateImage,
    Sprite: CreateSprite,
    Video: CreateVideo,
    Text: CreateText,
    BBCodeText: CreateBBCodeText,
    RoundRectangle: CreateRoundRectangle,
    Ninepatch: CreateNinePatch,
    Ninepatch2: CreateNinePatch2,
    Canvas: CreateCanvas,
    CircleMaskImage: CreateCircleMaskImage,
    Space: CreateSpace,

    Sizer: CreateSizer,
    FixWidthSizer: CreateFixWidthSizer,
    GridSizer: CreateGridSizer,
    OverlapSizer: CreateOverlapSizer,

    Buttons: CreateButtons,
    FixWidthButtons: CreateFixWidthButtons,
    GridButtons: CreateGridButtons,

    Label: CreateLabel,
    BadgeLabel: CreateBadgeLabel,
    Dialog: CreateDialog,
    TextBox: CreateTextBox,
    Slider: CreateSlider,
    NumberBar: CreateNumberBar,
    ScrollBar: CreateScrollBar,
    TextArea: CreateTextArea,
    Pages: CreatePages,
    Toast: CreateToast,
    Knob: CreateKnob,
    HolyGrail: CreateHolyGrail,
    Menu: CreateMenu,
};

/*
function(scene, data, view, styles, customBuilders) {
    return gameObject;
}
*/

export default Builders;
