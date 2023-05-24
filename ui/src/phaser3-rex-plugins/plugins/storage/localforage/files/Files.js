import localforage from 'localforage';
import GetValue from '../../../utils/object/GetValue.js';
import Save from './Save.js';
import Load from './Load.js';
import LoadHeaders from './LoadHeaders.js';
import Delete from './Delete.js';
import Clear from './Clear.js';
import DataProcessMethods from './DataProcessMethods.js';

class Files {
    constructor(config) {
        this.store = localforage.createInstance({
            name:  GetValue(config, 'name', 'files')
        });

        this.zipMode = GetValue(config, 'zip', true);
        this.cacheHeaders = {};
    }
}

var methods = {
    save: Save,
    load: Load,
    loadHeaders: LoadHeaders,
    delete: Delete,
    clear: Clear,
}

Object.assign(
    Files.prototype,
    methods,
    DataProcessMethods
);

export default Files;