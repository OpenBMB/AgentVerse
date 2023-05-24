var ByteArrayToUint32 = function (a, b, c, d, bigEndian) {
    if (bigEndian === undefined) {
        bigEndian = false;
    }
    var value;
    if (bigEndian) {
        value = (a << 24) | (b << 16) | (c << 8) | d;
    } else {
        value = a | (b << 8) | (c << 16) | (d << 24);
    }

    return value;
}
export default ByteArrayToUint32;