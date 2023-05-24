import FaceContainer from '../utils/FaceContainer.js';
import Roll from './Roll.js';
import CreateFaces from '../utils/CreateFaces.js';
import ForEachFace from '../utils/ForEachFace.js';
import GetFirstFace from './GetFirstFace.js';
import LayoutFaces from './LayoutFaces.js';
import FaceNameToIndex from './FaceNameToIndex.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const DegToRad = Phaser.Math.DegToRad;
const RadToDeg = Phaser.Math.RadToDeg;
const WrapDegrees = Phaser.Math.Angle.WrapDegrees;
const Linear = Phaser.Math.Linear;
const Wrap = Phaser.Math.Wrap;

class Carousel extends FaceContainer {
    constructor(scene, x, y, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
        }

        var faceConfig = GetValue(config, 'faces', undefined);
        if (!faceConfig) {
            faceConfig = [];
        }
        var faces = CreateFaces(scene, faceConfig);
        var firstFace = GetFirstFace(faces);

        var width = GetValue(config, 'width');
        var height = GetValue(config, 'height');
        if (width === undefined) {
            width = (firstFace) ? firstFace.width : 0;
        }
        if (height === undefined) {
            height = (firstFace) ? firstFace.height : 0;
        }

        super(scene, x, y, width, height, faces);
        this.type = 'rexPerspectiveCarousel';

        this.face0RotationY = undefined;

        var faceCount = faces.length;
        // Face angle
        this.faceAngle = (faceCount > 0) ? DegToRad(360 / faces.length) : 0;

        // Face width, face radius
        var faceWidth = GetValue(config, 'faceWidth', undefined);
        if (faceWidth === undefined) {
            var faceSpace = GetValue(config, 'faceSpace', 0);
            faceWidth = (firstFace) ? (firstFace.width + faceSpace) : 0;
        }
        this.faceWidth = faceWidth;
        if (faceCount > 2) {
            this.faceRadius = (faceWidth / 2) / Math.tan(this.faceAngle / 2);
        } else {
            this.faceRadius = faceWidth / 2;
        }

        LayoutFaces(this, faces);
        
        var rollConfig = GetValue(config, 'roll', undefined);
        if (rollConfig !== false) {
            var RollClass = GetValue(config, 'rollClass', Roll);
            this.roll = new RollClass(this, rollConfig);
        }

        // Left-To-Right, or Right-To-Left
        this.rtl = GetValue(config, 'rtl', false);

        // z-index
        this.zStart = GetValue(config, 'z', 1);
        this.zEnd = GetValue(config, 'zEnd', this.zStart - 1);

        this.setFace(GetValue(config, 'face', 0));
    }

    get rotationY() {
        return this.face0RotationY;
    }

    set rotationY(value) {
        if (this.face0RotationY === value) {
            return;
        }

        this.face0RotationY = value;
        var deltaAngle = this.faceAngle;
        var zStart = this.zStart;
        var zEnd = this.zEnd;
        var sign = (this.rtl) ? -1 : 1;
        ForEachFace(this.faces, function (face, i) {
            // Set rotationY
            var rotationY = value + (sign * deltaAngle * i);
            face.rotationY = rotationY;

            // Set depth
            var angle = Math.abs(WrapDegrees(RadToDeg(rotationY))); // 0~180
            var z = Linear(zStart, zEnd, angle / 180);
            face.setDepth(z);
        }, null, true);
    }

    get face() {
        return this.currentFaceIndex;
    }

    set face(index) {
        if (typeof (index) === 'string') {
            index = FaceNameToIndex(this.faces, index);
            if (index === -1) {
                index = 0;
            }
        }

        index = Wrap(index, 0, this.faces.length);
        this.currentFaceIndex = index;
        this.rotationY = ((this.rtl) ? 1 : -1) * this.faceAngle * index;
    }

    setFace(index) {
        this.face = index;
        return this;
    }
}

export default Carousel;