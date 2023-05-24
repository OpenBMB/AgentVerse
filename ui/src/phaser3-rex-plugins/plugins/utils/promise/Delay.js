var Delay = function (time, result) {
    if (time === undefined) {
        time = 0;
    }
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(result)
        }, time);
    });
};

export default Delay;