const MaxTestCount = 65535;

var SetFontSizeToFitWidth = function (textObject, width, height) {
    if (width == null) {
        // Do nothing if invalid width input
        return textObject;
    }
    if (width === 0) {
        SetTextWidth(textObject, 0, height);
        return textObject;
    }

    var textLength = textObject.text.length;
    if (textLength === 0) {
        SetTextWidth(textObject, width, height);
        return textObject;
    }

    var fontSize = Math.floor(width * 1.5 / textLength);

    var sizeData = {};
    var testResult = TestFontSize(textObject, fontSize, width, height, sizeData);
    for (var i = 0; i <= MaxTestCount; i++) {
        if (testResult === 0) {
            break;
        } else {
            fontSize += testResult;
            if (fontSize < 0) {
                fontSize = 0;
                break;
            }
        }
        testResult = TestFontSize(textObject, fontSize, width, height, sizeData);
        // console.log(fontSize, testResult)
    }

    if (i === MaxTestCount) {
        console.warn(`SetFontSizeToFitWidth: Test count exceeds ${MaxTestCount}`);
    }

    textObject.setFontSize(fontSize);
    SetTextWidth(textObject, width, height);

    return textObject;
}

var GetTextSize = function (textObject, fontSize, sizeData) {
    if (sizeData[fontSize] === undefined) {
        textObject.setFontSize(fontSize)
        sizeData[fontSize] = {
            width: textObject.width,
            height: textObject.height
        }
    }

    return sizeData[fontSize]
}

var TestFontSize = function (textObject, fontSize, width, height, sizeData) {
    var textSize = GetTextSize(textObject, fontSize, sizeData);
    var textSize1 = GetTextSize(textObject, fontSize + 1, sizeData);

    if (height !== undefined) {
        // Clamp by height
        if ((textSize.height <= height) && (textSize1.height > height)) {
            return 0;

        } else if (textSize.height > height) { // Reduce text size
            return -1;
        }
    }

    // Clamp by width
    if ((textSize.width <= width) && (textSize1.width > width)) {
        return 0;

    } else if (textSize.width > width) {  // Reduce text size
        return -1;

    } else {  // Increase text size
        return Math.floor(width - textSize.width);
    }
}

var SetTextWidth = function (textObject, width, height) {
    var style = textObject.style;

    style.fixedWidth = width;
    style.parent.width = width;

    if (height !== undefined) {
        style.fixedHeight = height;
        style.parent.height = height;
    }

    style.update(false);
}

export default SetFontSizeToFitWidth;