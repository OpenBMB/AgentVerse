const IDLE = 0;
const LOADING = 1;
const LOADED = 2;

var Live2dCoreScriptState = IDLE;

var SetState = function (state) {
    Live2dCoreScriptState = state;
}

var IsIdle = function () {
    return (Live2dCoreScriptState === IDLE);
}

var IsLoading = function () {
    return (Live2dCoreScriptState === LOADING);
}

var IsLoaded = function () {
    return (Live2dCoreScriptState === LOADED);
}

export {
    IDLE, LOADING, LOADED,
    SetState, IsIdle, IsLoading, IsLoaded
}