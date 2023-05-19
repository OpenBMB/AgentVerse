class ByteBuffer {
    constructor(size) {
        this.resize(size);
    }

    destroy() {
        this._rows = undefined;
        this._buf = undefined;
        this._bytes = undefined;
    }

    get(offset) {
        return this._bytes[offset];
    }

    set(offset, value) {
        this._bytes[offset] = value;
        return this;
    }

    fill(value) {
        for (var i = 0, cnt = this._rows; i < cnt; i++) {
            this._bytes[i] = value;
        }
        return this;
    }

    resize(size) {
        if (size !== this._rows) {
            this._rows = size;
            this._buf = new ArrayBuffer(this._rows);
            this._bytes = new Uint8Array(this._buf);
        }
        return this;
    }
}

export default ByteBuffer;