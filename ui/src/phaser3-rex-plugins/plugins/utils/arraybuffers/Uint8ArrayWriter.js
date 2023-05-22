import Uint32ToByteArray from '../math/Uint32ToByteArray.js';

class Uint8ArrayWriter {
    constructor(size) {
        this.buf = new Uint8Array(size);
        this.pointer = 0;
    }

    seek(pointer) {
        this.pointer = pointer;
        return this;
    }

    writeUint8(value) {
        this.buf[this.pointer] = value;
        this.pointer++;
        return this;
    }

    writeUint8Array(buf) {
        this.buf.set(buf, this.pointer);
        this.pointer += buf.length;
        return this;
    }

    writeUint32(value, bigEndian) {
        var buf = Uint32ToByteArray(value, bigEndian)
        this.writeUint8Array(buf);
        return this;
    }

    writeString(s) {
        var buf = (new TextEncoder()).encode(s);
        this.writeUint8Array(buf);
        return this;
    }

    get outOfArray() {
        return this.pointer === this.buf.length;
    }
}

export default Uint8ArrayWriter;