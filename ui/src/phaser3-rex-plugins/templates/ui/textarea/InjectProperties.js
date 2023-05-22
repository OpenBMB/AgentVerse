var InjectProperties = function (textBlock) {
    Object.defineProperty(textBlock, 'childOY', {
        configurable: true,
        get: function () {
            return textBlock.textOY;
        },
        set: function (value) {
            textBlock.textOY = value;
        }
    });
    Object.defineProperty(textBlock, 'topChildOY', {
        get: function () {
            return textBlock.topTextOY;
        }
    });
    Object.defineProperty(textBlock, 'bottomChildOY', {
        get: function () {
            return textBlock.bottomTextOY;
        }
    });
    Object.defineProperty(textBlock, 'childVisibleHeight', {
        get: function () {
            return textBlock.textObjectHeight;
        }
    });
    Object.defineProperty(textBlock, 'childHeight', {
        get: function () {
            return textBlock.textHeight;
        }
    });
};
export default InjectProperties;