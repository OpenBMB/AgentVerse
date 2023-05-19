var Uint32ToByteArray = function (value, bigEndian, output) {
    if (bigEndian === undefined) {
        bigEndian = false;
    }

    if (output === undefined) {
        output = [];
    }
    output.length = 4;

    if (bigEndian) {
        output[0] = (value >> 24) & 0xff;
        output[1] = (value >> 16) & 0xff;
        output[2] = (value >> 8) & 0xff;
        output[3] = value & 0xff;
    } else {
        output[0] = value & 0xff;
        output[1] = (value >> 8) & 0xff;
        output[2] = (value >> 16) & 0xff;
        output[3] = (value >> 24) & 0xff;
    }

    return output;
}

export default Uint32ToByteArray;