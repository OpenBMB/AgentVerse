const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

var Load = function (video, src, availableVideoTypes) {
    if (IsPlainObject(src)) {
        var videoType;
        for (var i = 0, cnt = VideoTypes.length; i < cnt; i++) {
            videoType = VideoTypes[i];
            if (availableVideoTypes[videoType] && src.hasOwnProperty(videoType)) {
                src = src[videoType];
                break;
            }
        }
    }

    video.src = src;
    video.load();
}

const VideoTypes = ['webm', 'ogg', 'mp4', 'h264', 'vp9', 'hls'];

export default Load;