import Setup from './setup/Setup.js';
import Update from './update/Update.js';
import Draw from './draw/Draw.js';

import GetExpressionNames from './expression/GetExpressionNames.js';
import SetExpression from './expression/SetExpression.js';
import SetRandomExpression from './expression/SetRandomExpression.js';

import GetMotionNames from './motion/GetMotionNames.js';
import GetMotionGroupNames from './motion/GetMotionGroupNames.js';
import StartMotion from './motion/StartMotion.js';
import StopAllMotions from './motion/StopAllMotions.js';
import IsAnyMotionPlaying from './motion/IsAnyMotionPlaying.js';
import GetPlayinigMotionNames from './motion/GetPlayinigMotionNames.js';

import RegisterParameter from './parameter/RegisterParameter.js';
import AddParameterValue from './parameter/AddParameterValue.js';
import ResetParameterValue from './parameter/ResetParameterValue.js';

import LocalXYToModelMatrixXY from './position/LocalXToModelMatrixX.js';
import GetDrawableBounds from './hitarea/GetDrawableBounds.js';
import HitTest from './hitarea/HitTest.js';

var Methods = {
    setup: Setup,
    update: Update,
    draw: Draw,

    getExpressionNames: GetExpressionNames,
    setExpression: SetExpression,
    setRandomExpression: SetRandomExpression,

    getMotionNames: GetMotionNames,
    getMotionGroupNames: GetMotionGroupNames,
    startMotion: StartMotion,
    stopAllMotions: StopAllMotions,
    isAnyMotionPlaying: IsAnyMotionPlaying,
    getPlayinigMotionNames: GetPlayinigMotionNames,

    registerParameter: RegisterParameter,
    addParameterValue: AddParameterValue,
    resetParameterValue: ResetParameterValue,

    localXYToModelMatrixXY: LocalXYToModelMatrixXY,
    getDrawableBounds: GetDrawableBounds,
    hitTest: HitTest,
}

export default Methods;