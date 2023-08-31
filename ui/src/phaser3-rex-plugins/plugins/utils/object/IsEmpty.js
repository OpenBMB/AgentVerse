var IsEmpty = function (source) {
    for (var k in source) {
        return false;
    }
    return true;
};

export default IsEmpty;