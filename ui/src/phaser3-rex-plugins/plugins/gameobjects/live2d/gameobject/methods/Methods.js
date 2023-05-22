import SetModel from './SetModel.js';

import GetExpressionNames from './expression/GetExpressionNames.js';
import SetExpression from './expression/SetExpression.js';
import SetRandomExpression from './expression/SetRandomExpression.js';

import GetMotionNames from './motion/GetMotionNames.js';
import GetMotionGroupNames from './motion/GetMotionGroupNames.js';
import StartMotion from './motion/StartMotion.js';
import StopAllMotions from './motion/StopAllMotions.js';
import GetPlayinigMotionNames from './motion/GetPlayinigMotionNames.js';
import IsAnyMotionPlaying from './motion/IsAnyMotionPlaying.js';
import AutoPlayIdleMotion from './motion/AutoPlayIdleMotion.js';

import RegisterParameter from './parameter/RegisterParameter.js';
import AddParameterValue from './parameter/AddParameterValue.js';
import ResetParameterValue from './parameter/ResetParameterValue.js';
import GetParameters from './parameter/GetParameters.js';
import LookAt from './parameter/LookAt.js';
import LookForward from './parameter/LookForward.js';

import SetLipSyncValue from './lipsync/SetLipSyncValue.js';

import SetInteractive from './interactive/SetInteractive.js';
import GetHitTestResult from './interactive/GetHitTestResult.js';
import HitTest from './interactive/HitTest.js';

import GetModelXY from './position/WorldXYToModelXY.js';

import SetTimeScale from './SetTimeScale.js';


var Methods = {
    setModel: SetModel,

    getExpressionNames: GetExpressionNames,
    setExpression: SetExpression,
    setRandomExpression: SetRandomExpression,

    getMotionNames: GetMotionNames,
    getMotionGroupNames: GetMotionGroupNames,
    startMotion: StartMotion,
    stopAllMotions: StopAllMotions,
    getPlayinigMotionNames: GetPlayinigMotionNames,
    isAnyMotionPlaying: IsAnyMotionPlaying,
    autoPlayIdleMotion: AutoPlayIdleMotion,

    registerParameter: RegisterParameter,
    addParameterValue: AddParameterValue,
    resetParameterValue: ResetParameterValue,
    getParameters: GetParameters,
    lookAt: LookAt,
    lookForward: LookForward,

    setLipSyncValue: SetLipSyncValue,

    setInteractive: SetInteractive,
    getHitTestResult: GetHitTestResult,
    hitTest: HitTest,

    getModelXY: GetModelXY,

    setTimeScale: SetTimeScale,
}



export default Methods;