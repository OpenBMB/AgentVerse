const GetValue = Phaser.Utils.Objects.GetValue;

var CreateVideoElement = function (config) {
    var element = document.createElement('video');

    // Apply registed properties
    var elemProp, elemPropValue;
    for (var key in ElementProperties) {
        elemProp = ElementProperties[key];
        elemPropValue = GetValue(config, key, elemProp[1]);
        if (elemPropValue !== undefined) {
            element[elemProp[0]] = elemPropValue;
        }
    }

    // Apply events
    var eventEmitter = GetValue(config, 'eventEmitter', undefined);
    if (eventEmitter) {
        for (let eventName in ElementEvents) { // Note: Don't use `var` here
            element.addEventListener(ElementEvents[eventName], (function () {
                eventEmitter.emit(eventName, this);
            }).bind(this));
        }
    }

    return element;
}

const ElementProperties = {
    id: ['id', undefined],
    width: ['width', undefined],
    height: ['height', undefined],
    autoPlay: ['autoplay', true],
    controls: ['controls', false],
    loop: ['loop', false],
    poster: ['poster', undefined],
    preload: ['preload', undefined],
    muted: ['muted', false],
    playsInline: ['playsInline', true],
    crossOrigin: ['crossOrigin', 'anonymous'],
};

const ElementEvents = {
    canplay: 'canplay',
    canplaythrough: 'canplaythrough',
    ended: 'ended',
    error: 'error',
    loadstart: 'loadstart',
    playing: 'playing',
    pause: 'pause',
    stalled: 'stalled',
};

export default CreateVideoElement;