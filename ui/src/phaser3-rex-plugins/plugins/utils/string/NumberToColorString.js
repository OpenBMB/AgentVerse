var NumberToColorString = function (value) {
    if (typeof (value) === 'number') {
        value = `#${value.toString(16)}`;
    }
    return value;
}

export default NumberToColorString;