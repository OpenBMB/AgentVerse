import ByteArrayToUint32 from '../math/ByteArrayToUint32.js';

class Uint8ArrayReader {
    constructor(buf) {
        this.buf = buf;
        this.lastPointer = this.buf.length;
        this.pointer = 0;
    }

    seek(value) {
        this.pointer = value;
        return this;
    }

    seekBack(value) {
        this.pointer -= value;
        return this;
    }

    seekForward(value) {
        this.pointer += value;
        return this;
    }

    readUint8() {
        var data = this.buf[this.pointer];
        this.pointer++;
        return data;
    }

    readUint32(bigEndian) {
        if (bigEndian === undefined) {
            bigEndian = false;
        }

        return ByteArrayToUint32(
            this.readUint8(), this.readUint8(), this.readUint8(), this.readUint8(),
            bigEndian
        );
    }

    readString(size) {
        var s = '';
        for (var i = 0; i < size; i++) {
            s += String.fromCharCode(this.readUint8());
        }
        return s;
    }

    readUint8Array(size) {
        var data;
        if (size !== undefined) {
            data = this.buf.slice(this.pointer, this.pointer + size);
        } else {
            data = this.buf.slice(this.pointer);
        }
        this.pointer += data.length;
        return data;
    }

    get outOfArray() {
        return this.pointer >= this.lastPointer;
    }
}

export default Uint8ArrayReader;