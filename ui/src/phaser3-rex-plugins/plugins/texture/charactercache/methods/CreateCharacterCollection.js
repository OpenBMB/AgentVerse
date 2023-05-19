import loki from 'lokijs/src/lokijs.js';

var CreateCharacterDB = function (db) {
    if (db === undefined) {
        db = new loki('characters.db', {
            env: 'BROWSER'
        });
    }
    var collection = db.addCollection('characters', {
        disableMeta: true,
        unique: ['character'],
        indices: ['character', 'freq', 'alive', 'lock']
    });
    return collection;
}

export default CreateCharacterDB;