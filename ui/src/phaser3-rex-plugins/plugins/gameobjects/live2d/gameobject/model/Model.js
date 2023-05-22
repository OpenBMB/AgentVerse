import { csmMap } from '../../framework/src/type/csmmap';
import { csmVector } from '../../framework/src/type/csmvector';
import { CubismUserModel } from '../../framework/src/model/cubismusermodel';
import ViewMatrix from './ViewMatrix.js';
import GlobalData from '../globaldata/GlobalData.js';
import Methods from './Methods.js';

class Model extends CubismUserModel {
    constructor(parent) {
        super();

        // Initialize Live2d framework, and get shared resources
        this._globalData = GlobalData.getInstance(parent);

        this.parent = parent;  // Live2dGameObject
        this.viewMatrix = new ViewMatrix();

        this._eyeBlinkIds = new csmVector();

        this._lipSyncIds = new csmVector();
        this._lipSyncValue = 0;

        this._motions = new csmMap();

        this._expressions = new csmMap();
        this._currentExpressionName = undefined;

        this._addParamValues = {};

        this._pixelWidth = 0;
        this._pixelHeight = 0;

        this._hitTestResult = {};

        // this._wavFileHandler = new LAppWavFileHandler();
    }

    release() {
        super.release();

        this.parent = undefined;
        this._globalData = undefined;
    }
}

Object.assign(
    Model.prototype,
    Methods
)

export default Model;