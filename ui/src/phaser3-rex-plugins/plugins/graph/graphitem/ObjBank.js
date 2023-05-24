import Bank from '../../bank.js';

var ObjBank = new Bank({
    uidKey: '$uid',
    remove: false, // remove uid manually
});
export default ObjBank;