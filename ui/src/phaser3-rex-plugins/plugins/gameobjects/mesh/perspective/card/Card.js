import FaceContainer from '../utils/FaceContainer.js';
import CreateFaces from '../utils/CreateFaces.js';
import ForEachFace from '../utils/ForEachFace.js';
import LayoutFaces from './LayoutFaces.js';
import Flip from './Flip.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

const FaceNames = ['back', 'front'];

class Card extends FaceContainer {
    constructor(scene, x, y, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
        }

        var faces = CreateFaces(scene, config, FaceNames);
        var backFace = faces.back;
        var frontFace = faces.front;

        var width = GetValue(config, 'width');
        var height = GetValue(config, 'height');
        if ((width === undefined) || (height === undefined)) {
            if (width === undefined) {
                var frontFaceWidth = (frontFace) ? frontFace.width : 0;
                var backFaceWidth = (backFace) ? backFace.width : 0;
                width = Math.max(frontFaceWidth, backFaceWidth);
            }

            if (height === undefined) {
                var frontFaceHeight = (frontFace) ? frontFace.height : 0;
                var backFaceHeight = (backFace) ? backFace.height : 0;
                height = Math.max(frontFaceHeight, backFaceHeight);
            }
        }

        super(scene, x, y, width, height, faces);
        this.type = 'rexPerspectiveCard';

        this.frontFaceRotationX = 0;
        this.frontFaceRotationY = 0;
        this.frontFaceRotationZ = 0;

        ForEachFace(faces, function (face, name) {
            this[`${name}Face`] = face;
        }, this);

        var flipConfig = GetValue(config, 'flip', undefined);
        if (flipConfig !== false) {
            this.flip = new Flip(this, flipConfig);
        }

        this.setOrientation(GetValue(config, 'orientation', 0));
        LayoutFaces(this, faces);

        this.setFace(GetValue(config, 'face', 0));
    }

    get rotationX() {
        return this.frontFaceRotationX;
    }

    set rotationX(value) {
        if (this.frontFaceRotationX === value) {
            return;
        }

        this.frontFaceRotationX = value;
        ForEachFace(this.faces, function (face) {
            face.rotationX = value;
        }, null, true);
    }

    get rotationY() {
        return this.frontFaceRotationY;
    }

    set rotationY(value) {
        if (this.frontFaceRotationY === value) {
            return;
        }

        this.frontFaceRotationY = value;
        ForEachFace(this.faces, function (face) {
            face.rotationY = value;
        }, null, true);
    }

    get rotationZ() {
        return this.frontFaceRotationZ;
    }

    set rotationZ(value) {
        if (this.frontFaceRotationZ === value) {
            return;
        }

        this.frontFaceRotationZ = value;
        ForEachFace(this.faces, function (face) {
            face.rotationZ = value;
        }, null, true);
    }

    setOrientation(orientation) {
        if (typeof (orientation) === 'string') {
            orientation = ORIENTATIONMODE[orientation];
        }
        this.orientation = orientation;
        return this;
    }

    get face() {
        return this.currentFaceIndex;
    }

    set face(index) {
        if (typeof (index) === 'string') {
            index = FACEMODE[index];
        }
        this.currentFaceIndex = index;

        var isBackFace = (index === 1);
        var angle = (isBackFace) ? 180 : 0;
        if (this.orientation === 0) {  // Flip around Y
            this.angleY = angle;
        } else {  // Flip around X
            this.angleX = angle;
        }
    }

    setFace(face) {
        this.face = face;
        return this;
    }

    toggleFace() {
        var newFace = (this.face === 0) ? 1 : 0;
        this.setFace(newFace);
        return this;
    }
}

const ORIENTATIONMODE = {
    x: 0,
    horizontal: 0,
    h: 0,

    y: 1,
    vertical: 1,
    v: 1
}

const FACEMODE = {
    front: 0,
    back: 1,
}

export default Card;