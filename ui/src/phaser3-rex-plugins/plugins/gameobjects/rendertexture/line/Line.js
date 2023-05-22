import UpdateTexture from './UpdateTexture.js';

const RenderTexture = Phaser.GameObjects.RenderTexture;
const GetValue = Phaser.Utils.Objects.GetValue;

class Line extends RenderTexture {
    constructor(scene, config) {
        super(scene);
        this.redraw = false;
        this._tileSprite = undefined; // Reserved for drawing image
        this._image = undefined; // Reserved for drawing image

        var lineStart = GetValue(config, 'start', undefined);
        if (typeof (lineStart) === 'string') {
            this.setLineStartPosition(0, 0);
            this.setLineStartTexture(lineStart, undefined);
            this.setLineStartOrigin(undefined);
        } else {
            this.setLineStartPosition(GetValue(lineStart, 'x', 0), GetValue(lineStart, 'y', 0));
            this.setLineStartTexture(GetValue(lineStart, 'key', undefined), GetValue(lineStart, 'frame', undefined));
            this.setLineStartOrigin(GetValue(lineStart, 'origin', undefined));
        }

        var lineEnd = GetValue(config, 'end', undefined);
        if (typeof (lineEnd) === 'string') {
            this.setLineEndPosition(0, 0);
            this.setLineEndTexture(lineEnd, undefined);
            this.setLineEndOrigin(undefined);
        } else {
            this.setLineEndPosition(GetValue(lineEnd, 'x', 0), GetValue(lineEnd, 'y', 0));
            this.setLineEndTexture(GetValue(lineEnd, 'key', undefined), GetValue(lineEnd, 'frame', undefined));
            this.setLineEndOrigin(GetValue(lineEnd, 'origin', undefined));
        }

        var lineBody = GetValue(config, 'body', undefined);
        if (typeof (lineBody) === 'string') {
            this.setLineBodyTexture(lineBody, undefined);
            this.setLineBodyExtendMode(0);
            this.setLineBodyWidth(undefined);
        } else {
            this.setLineBodyTexture(GetValue(lineBody, 'key', undefined), GetValue(lineBody, 'frame', undefined));
            this.setLineBodyExtendMode(GetValue(lineBody, 'extendMode', 1));
            this.setLineBodyWidth(GetValue(lineBody, 'width', undefined));
        }
    }

    get x0() {
        return this._x0;
    }

    set x0(value) {
        this.redraw |= (this._x0 !== value);
        this._x0 = value;
    }

    get y0() {
        return this._y0;
    }

    set y0(value) {
        this.redraw |= (this._y0 !== value);
        this._y0 = value;
    }

    get x1() {
        return this._x1;
    }

    set x1(value) {
        this.redraw |= (this._x1 !== value);
        this._x1 = value;
    }

    get y1() {
        return this._y1;
    }

    set y1(value) {
        this.redraw |= (this._y1 !== value);
        this._y1 = value;
    }

    setLineStartPosition(x, y) {
        this.x0 = x;
        this.y0 = y;
        return this;
    }

    setLineEndPosition(x, y) {
        this.x1 = x;
        this.y1 = y;
        return this;
    }

    setLineStartTexture(key, frame) {
        this.lineStartTexture = key;
        this.lineStartFrameName = frame;
        this.redraw = true;
        return this;
    }

    setLineStartOrigin(origin) {
        if (origin === undefined) {
            origin = 0;
        }
        this.lineStartOrigin = origin;
        this.redraw = true;
        return this;
    }

    get lineStartFrame() {
        return this.scene.sys.textures.getFrame(this.lineStartTexture, this.lineStartFrameName);
    }

    setLineEndTexture(key, frame) {
        this.lineEndTexture = key;
        this.lineEndFrameName = frame;
        this.redraw = true;
        return this;
    }

    setLineEndOrigin(origin) {
        if (origin === undefined) {
            origin = 1;
        }
        this.lineEndOrigin = origin;
        this.redraw = true;
        return this;
    }

    get lineEndFrame() {
        return this.scene.sys.textures.getFrame(this.lineEndTexture, this.lineEndFrameName);
    }

    setLineBodyTexture(key, frame) {
        this.lineBodyTexture = key;
        this.lineBodyFrameName = frame;
        this.redraw = true;
        return this;
    }

    setLineBodyWidth(width) {
        this.lineBodyWidth = width;
        this.redraw = true;
        return this;
    }

    setLineBodyExtendMode(mode) {
        if (typeof (mode) === 'string') {
            mode = EXTENDMODE[mode];
        }
        this.lineBodyExtendMode = mode;
        return this;
    }

    get lineBodyFrame() {
        return this.scene.sys.textures.getFrame(this.lineBodyTexture, this.lineBodyFrameName);
    }

    renderWebGL(renderer, src,  camera, parentMatrix) {
        this.updateTexture();
        super.renderWebGL(renderer, src,  camera, parentMatrix);
    }

    renderCanvas(renderer, src,  camera, parentMatrix) {
        this.updateTexture();
        super.renderCanvas(renderer, src,  camera, parentMatrix);
    }
}

const EXTENDMODE = {
    scale: 0,
    repeat: 1,
}

var methods = {
    updateTexture: UpdateTexture,
}
Object.assign(
    Line.prototype,
    methods
);

export default Line;