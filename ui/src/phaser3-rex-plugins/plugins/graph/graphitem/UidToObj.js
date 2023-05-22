import ObjBank from './ObjBank.js';

var UidToObj = function (uid) {
    if (uid == null) {
        return null;
    } else {
        return ObjBank.get(uid).parent;
    }
}
export default UidToObj;