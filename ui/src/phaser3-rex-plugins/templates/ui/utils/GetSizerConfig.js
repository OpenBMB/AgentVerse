var GetSizerConfig = function (gameObject) {
    if (!gameObject.hasOwnProperty('rexSizer')) {
        gameObject.rexSizer = {};
    }
    return gameObject.rexSizer;
}
export default GetSizerConfig;