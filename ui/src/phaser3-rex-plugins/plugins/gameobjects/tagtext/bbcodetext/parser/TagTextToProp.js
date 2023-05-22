const PROP_REMOVE = false;
const PROP_ADD = true;

var GETPROP_RESULT = {
    plainText: null,
    prevProp: null
};

var TagTextToProp = function (text, prevProp) {
    var TagRegex = this.tagRegex;

    // text : result of splitText()
    if (prevProp == null) {
        prevProp = {};
    }
    var plainText = '';

    // close image tag
    if (prevProp.img) {
        UpdateProp(prevProp, PROP_REMOVE, 'img');
    }

    if (prevProp.esc) {
        if (TagRegex.RE_ESC_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, 'esc');
        } else {
            plainText = text;
        }

    } else if (prevProp.raw) {
        if (TagRegex.RE_RAW_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, 'raw');
        } else {
            plainText = text;
        }

    } else {
        if (TagRegex.RE_ESC_OPEN.test(text)) {
            UpdateProp(prevProp, PROP_ADD, 'esc', true);
        } else if (TagRegex.RE_ESC_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, 'esc');

        } else if (TagRegex.RE_RAW_OPEN.test(text)) {
            UpdateProp(prevProp, PROP_ADD, 'raw', true);
        } else if (TagRegex.RE_RAW_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, 'raw');

        } else if (TagRegex.RE_BLOD_OPEN.test(text)) {
            UpdateProp(prevProp, PROP_ADD, 'b', true);
        } else if (TagRegex.RE_BLOD_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, 'b');

        } else if (TagRegex.RE_ITALICS_OPEN.test(text)) {
            UpdateProp(prevProp, PROP_ADD, 'i', true);
        } else if (TagRegex.RE_ITALICS_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, 'i');

        } else if (TagRegex.RE_WEIGHT_OPEN.test(text)) {
            var innerMatch = text.match(TagRegex.RE_WEIGHT_OPEN);
            UpdateProp(prevProp, PROP_ADD, 'weight', innerMatch[1]);
        } else if (TagRegex.RE_WEIGHT_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, 'weight');

        } else if (TagRegex.RE_SIZE_OPEN.test(text)) {
            var innerMatch = text.match(TagRegex.RE_SIZE_OPEN);
            UpdateProp(prevProp, PROP_ADD, 'size', `${innerMatch[1]}px`);
        } else if (TagRegex.RE_SIZE_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, 'size');

        } else if (TagRegex.RE_COLOR_OPEN.test(text)) {
            var innerMatch = text.match(TagRegex.RE_COLOR_OPEN);
            UpdateProp(prevProp, PROP_ADD, 'color', innerMatch[1]);
        } else if (TagRegex.RE_COLOR_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, 'color');

        } else if (TagRegex.RE_UNDERLINE_OPEN.test(text)) {
            UpdateProp(prevProp, PROP_ADD, 'u', true);
        } else if (TagRegex.RE_UNDERLINE_OPENC.test(text)) {
            var innerMatch = text.match(TagRegex.RE_UNDERLINE_OPENC);
            UpdateProp(prevProp, PROP_ADD, 'u', innerMatch[1]);
        } else if (TagRegex.RE_UNDERLINE_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, 'u');

        } else if (TagRegex.RE_SHADOW_OPEN.test(text)) {
            UpdateProp(prevProp, PROP_ADD, 'shadow', true);
        } else if (TagRegex.RE_SHADOW_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, 'shadow');

        } else if (TagRegex.RE_STROKE_OPEN.test(text)) {
            UpdateProp(prevProp, PROP_ADD, 'stroke', true);
        } else if (TagRegex.RE_STROKE_OPENC.test(text)) {
            var innerMatch = text.match(TagRegex.RE_STROKE_OPENC);
            UpdateProp(prevProp, PROP_ADD, 'stroke', innerMatch[1]);
        } else if (TagRegex.RE_STROKE_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, 'stroke');

        } else if (TagRegex.RE_OFFSETY_OPEN.test(text)) {
            var innerMatch = text.match(TagRegex.RE_OFFSETY_OPEN);
            UpdateProp(prevProp, PROP_ADD, 'y', parseFloat(innerMatch[1]));
        } else if (TagRegex.RE_OFFSETY_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, 'y');

        } else if (TagRegex.RE_IMAGE_OPEN.test(text)) {
            var innerMatch = text.match(TagRegex.RE_IMAGE_OPEN);
            UpdateProp(prevProp, PROP_ADD, 'img', innerMatch[1]);
        } else if (TagRegex.RE_IMAGE_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, 'img');

        } else if (TagRegex.RE_AREA_OPEN.test(text)) {
            var innerMatch = text.match(TagRegex.RE_AREA_OPEN);
            UpdateProp(prevProp, PROP_ADD, 'area', innerMatch[1]);
        } else if (TagRegex.RE_AREA_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, 'area');

        } else if (TagRegex.RE_URL_OPEN.test(text)) {
            var innerMatch = text.match(TagRegex.RE_URL_OPEN);
            UpdateProp(prevProp, PROP_ADD, 'url', innerMatch[1]);
        } else if (TagRegex.RE_URL_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, 'url');

        } else if (TagRegex.RE_ALIGN_OPEN.test(text)) {
            var innerMatch = text.match(TagRegex.RE_ALIGN_OPEN);
            UpdateProp(prevProp, PROP_ADD, 'align', innerMatch[1]);
        } else if (TagRegex.RE_ALIGN_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, 'align');

        } else {
            plainText = text;
        }
    }

    var result = GETPROP_RESULT;
    result.plainText = plainText;
    result.prop = prevProp;
    return result;
}

var UpdateProp = function (prop, op, key, value) {
    if (op === PROP_ADD) {
        // PROP_ADD     
        prop[key] = value;
    } else {
        // PROP_REMOVE        
        if (prop.hasOwnProperty(key)) {
            delete prop[key];
        }
    }

    return prop;
};

export default TagTextToProp;