var IsArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}
export default IsArray;