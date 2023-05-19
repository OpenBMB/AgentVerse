var IsUID = function (object) {
    var type = typeof (object);
    return (type === 'number') || (type === 'string');
}
export default IsUID;