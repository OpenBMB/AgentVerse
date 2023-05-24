import ParseColorTag from './textstyle/OnParseColorTag.js';
import ParseStrokeColorTag from './textstyle/OnParseStrokeColorTag.js';
import ParseBoldTag from './textstyle/OnParseBoldTag.js';
import ParseItalicTag from './textstyle/OnParseItalicTag.js';
import ParseFontSizeTag from './textstyle/OnParseFontSizeTag.js';
import ParseOffsetYTag from './textstyle/OnParseOffsetYTag.js';
import ParseOffsetXTag from './textstyle/OnParseOffsetXTag.js';
import ParseLeftSpaceTag from './textstyle/OnParseLeftSpaceTag.js';
import ParseRightSpaceTag from './textstyle/OnParseRightSpaceTag.js';
import ParseShadowColorTag from './textstyle/OnParseShadowColorTag.js';
import ParseAlignTag from './textstyle/OnParseAlignTag.js'
import ParseImageTag from './image/OnParseImageTag.js';
import ParseSpaceTag from './space/OnParseSpaceTag.js';
import ParseTypingSpeedTag from './typing/OnParseTypingSpeedTag.js';
import ParsePlaySoundEffectTag from './soundeffect/OnParsePlaySoundEffectTag.js';
import ParseFadeInSoundEffectTag from './soundeffect/OnParseFadeInSoundEffectTag.js';
import ParseFadeOutSoundEffectTag from './soundeffect/OnParseFadeOutSoundEffectTag.js';
import ParseSetSoundEffectVolumeTag from './soundeffect/OnParseSetSoundEffectVolumeTag.js';
import ParsePlayBackgroundMusicTag from './backgroundmusic/OnParsePlayBackgroundMusicTag.js';
import ParseFadeInBackgroundMusicTag from './backgroundmusic/OnParseFadeInBackgroundMusicTag.js';
import ParseFadeOutBackgroundMusicTag from './backgroundmusic/OnParseFadeOutBackgroundMusicTag.js';
import ParseCrossFadeBackgroundMusicTag from './backgroundmusic/OnParseCrossFadeBackgroundMusicTag.js';
import ParsePauseBackgroundMusicTag from './backgroundmusic/OnParsePauseBackgroundMusicTag.js';
import ParseFadeInCameraTag from './camera/OnParseFadeInCameraTag.js';
import ParseFadeOutCameraTag from './camera/OnParseFadeOutCameraTag.js';
import ParseShakeCameraTag from './camera/OnParseShakeCameraTag.js';
import ParseFlashCameraTag from './camera/OnParseFlashCameraTag.js';
import ParseZoomCameraTag from './camera/OnParseZoomCameraTag.js';
import ParseRotateCameraTag from './camera/OnParseRotateCameraTag.js';
import ParseScrollCameraTag from './camera/OnParseScrollCameraTag.js';
import ParseWaitTag from './wait/OnParseWaitTag.js';
import ParseNewLineTag from './content/OnParseNewLineTag.js';
import ParsePageBreakTag from './content/OnParsePageBreakTag.js';
import ParseContentOff from './content/OnParseContentOff.js';
import ParseContentOn from './content/OnParseContentOn.js';
import ParseContent from './content/OnParseContent.js';
import ParseCustomTag from './custom/OnParseCustomTag.js';

const ParseCallbacks = [
    ParseColorTag, ParseStrokeColorTag,
    ParseBoldTag, ParseItalicTag,
    ParseFontSizeTag, ParseShadowColorTag, ParseAlignTag,
    ParseOffsetYTag, ParseOffsetXTag, ParseLeftSpaceTag, ParseRightSpaceTag,
    ParseImageTag,
    ParseSpaceTag,

    ParseTypingSpeedTag,

    ParsePlaySoundEffectTag, ParseFadeInSoundEffectTag, ParseFadeOutSoundEffectTag, ParseSetSoundEffectVolumeTag,
    ParsePlayBackgroundMusicTag, ParseFadeInBackgroundMusicTag, ParseFadeOutBackgroundMusicTag, ParseCrossFadeBackgroundMusicTag, ParsePauseBackgroundMusicTag,

    ParseFadeInCameraTag, ParseFadeOutCameraTag, ParseShakeCameraTag, ParseFlashCameraTag, ParseZoomCameraTag, ParseRotateCameraTag, ParseScrollCameraTag,

    ParseWaitTag,

    ParseNewLineTag, ParsePageBreakTag,
    ParseContentOff, ParseContentOn,
    ParseContent,

    ParseCustomTag,
];

var AddParseCallbacks = function (textPlayer, parser, config) {
    for (var i = 0, cnt = ParseCallbacks.length; i < cnt; i++) {
        ParseCallbacks[i](textPlayer, parser, config);
    }
}

export default AddParseCallbacks;