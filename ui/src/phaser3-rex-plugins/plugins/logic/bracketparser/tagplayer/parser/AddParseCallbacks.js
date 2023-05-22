import ParseWaitTag from './wait/OnParseWaitTag.js';
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
import ParseContent from './content/OnParseContent.js';
import ParseCustomTag from './custom/OnParseCustomTag.js';

const ParseCallbacks = [

    ParseWaitTag,

    ParsePlaySoundEffectTag, ParseFadeInSoundEffectTag, ParseFadeOutSoundEffectTag, ParseSetSoundEffectVolumeTag,
    ParsePlayBackgroundMusicTag, ParseFadeInBackgroundMusicTag, ParseFadeOutBackgroundMusicTag, ParseCrossFadeBackgroundMusicTag, ParsePauseBackgroundMusicTag,

    ParseFadeInCameraTag, ParseFadeOutCameraTag, ParseShakeCameraTag, ParseFlashCameraTag, ParseZoomCameraTag, ParseRotateCameraTag, ParseScrollCameraTag,

    ParseContent,

    ParseCustomTag,
];

var AddParseCallbacks = function (tagPlayer, parser, config) {
    for (var i = 0, cnt = ParseCallbacks.length; i < cnt; i++) {
        ParseCallbacks[i](tagPlayer, parser, config);
    }

    parser
        .on('start', function () {
            tagPlayer.emit('start', parser);
        })
        .on('complete', function () {
            tagPlayer.emit('complete', parser);
        })

}

export default AddParseCallbacks;