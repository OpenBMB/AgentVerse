import CSVParser from 'papaparse/papaparse.min.js';
import TypeConvert from '../../utils/string/TypeConvert.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class CsvToHashTable {
    constructor(config) {
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.table = GetValue(o, 'table', {}); // 2d hash table
        this.rowKeys = GetValue(o, 'row', []);
        this.colKeys = GetValue(o, 'col', []);
        this.cursor = GetValue(o, 'cursor', {});
        return this;
    }

    toJSON() {
        return {
            table: this.table,
            row: this.rowKeys,
            col: this.colKeys,
            cursor: this.cursor
        };
    }

    shutdown() {
        this.table = undefined;
        this.rowKeys = undefined;
        this.colKeys = undefined;
        this.cursor = undefined;
    }

    destroy() {
        this.shutdown();
    }

    loadCSV(csvString, config) {
        var delimiter = GetValue(config, 'delimiter', ',');
        var convert = GetValue(config, 'convert', true);
        var convertScope = GetValue(config, 'convertScope', undefined);
        if (!convert) {
            convert = undefined;
            convertScope = undefined;
        } else if (convert === true) {
            convert = TypeConvert;
            convertScope = undefined;
        }

        var arr = CSVParser.parse(csvString, {
            delimiter: delimiter
        }).data;

        var inColKeys = arr[0];
        for (var i = 0, cnt = inColKeys.length; i < cnt; i++) {
            var colKey = inColKeys[i];
            if (this.colKeys.indexOf(colKey) !== -1) {
                continue;
            }
            this.colKeys.push(colKey);
        }

        var inRowKeys = arr.map(function (row) { return row[0] });
        inRowKeys.shift();  // skip 1st row
        for (var i = 0, cnt = inRowKeys.length; i < cnt; i++) {
            var rowKey = inRowKeys[i];
            if (this.rowKeys.indexOf(rowKey) !== -1) {
                continue;
            }
            this.rowKeys.push(rowKey);
        }

        var table = this.table;
        var colKey, rowKey, row, value;

        for (var r = 0, rcnt = inRowKeys.length; r < rcnt; r++) {
            rowKey = inRowKeys[r];
            if (!table.hasOwnProperty(rowKey)) {
                table[rowKey] = {};
            }
            row = table[rowKey];
            for (var c = 0, ccnt = inColKeys.length; c < ccnt; c++) {
                value = arr[r + 1][c];
                colKey = inColKeys[c];

                if (convert) {
                    if (convertScope) {
                        value = convert.call(convertScope, value, rowKey, colKey, this);
                    } else {
                        value = convert(value, rowKey, colKey, this);
                    }
                }
                row[colKey] = value;
            }
        }

        this.setCursor('', '');

        return this;
    }

    clear() {
        var table = this.table;
        for (var key in table) {
            delete table[key];
        }
        this.rowKeys.length = 0;
        this.colKeys.length = 0;
        return this;
    };

    get(rowKey, colKey) {
        if (typeof (rowKey) === 'number') {
            rowKey = this.rowKeys[rowKey];
        }
        if (typeof (colKey) === 'number') {
            colKey = this.colKeys[colKey];
        }

        var value = undefined;
        var table = this.table;
        if (table.hasOwnProperty(rowKey)) {
            var row = table[rowKey];
            if (row.hasOwnProperty(colKey)) {
                value = row[colKey];
            }
        }

        this.setCursor(rowKey, colKey);
        return value;
    }

    set(rowKey, colKey, value) {
        if (typeof (rowKey) === 'number') {
            rowKey = this.rowKeys[rowKey];
        }
        if (typeof (colKey) === 'number') {
            colKey = this.colKeys[colKey];
        }

        var table = this.table;
        if (table.hasOwnProperty(rowKey)) {
            var row = table[rowKey];
            if (row.hasOwnProperty(colKey)) {
                row[colKey] = value;
            }
        }

        this.setCursor(rowKey, colKey);
        return this;
    }

    add(rowKey, colKey, value) {
        if (typeof (rowKey) === 'number') {
            rowKey = this.rowKeys[rowKey];
        }
        if (typeof (colKey) === 'number') {
            colKey = this.colKeys[colKey];
        }

        var table = this.table;
        if (table.hasOwnProperty(rowKey)) {
            var row = table[rowKey];
            if (row.hasOwnProperty(colKey)) {
                row[colKey] += value;
            }
        }

        this.setCursor(rowKey, colKey);
        return this;
    }

    hasRowKey(rowKey) {
        if (typeof (rowKey) === 'number') {
            return this.rowKeys.length > rowKey;
        }

        return (this.rowKeys.indexOf(rowKey) !== -1);
    }

    hasColKey(colKey) {
        if (typeof (colKey) === 'number') {
            return this.colKeys.length > colKey;
        }

        return (this.colKeys.indexOf(colKey) !== -1);
    }

    hasKey(rowKey, colKey) {
        return this.hasRowKey(rowKey) && this.hasColKey(colKey);
    }

    isValueInRol(rowKey, value) {
        if (!this.hasRowKey(rowKey)) {
            return false;
        }
        if (typeof (rowKey) === 'number') {
            rowKey = this.rowKeys[rowKey];
        }

        var row = this.table[rowKey];
        var colKey, colKeys = this.colKeys;
        for (var i = 0, len = colKeys.length; i < len; i++) {
            colKey = colKeys[i];
            if (row[colKey] === value) {
                return true;
            }
        }

        return false;
    }

    isValueInCol(colKey, value) {
        if (!this.hasColKey(colKey)) {
            return false;
        }
        if (typeof (colKey) === 'number') {
            colKey = this.colKeys[colKey];
        }

        var table = this.table;
        var rowKey, rowKeys = this.rowKeys
        for (var i = 0, len = rowKeys.length; i < len; i++) {
            if (table[rowKey][colKey] === value) {
                return true;
            }
        }

        return false;
    }

    appendRow(rowKey, callback, scope) {
        if (this.hasRowKey(rowKey)) {
            return this;
        }
        if (typeof (rowKey) === 'number') {
            rowKey = this.rowKeys[rowKey];
        }


        var isCallbackMode = (typeof (callback) === 'function');
        var initValue = (isCallbackMode) ? undefined : callback;

        this.rowKeys.push(rowKey);
        var row = {};
        this.table[rowKey] = row;
        var colKey, colKeys = this.colKeys,
            value;
        for (var i = 0, len = colKeys.length; i < len; i++) {
            colKey = colKeys[i];

            if (isCallbackMode) {
                if (scope) {
                    value = callback.call(scope, this, rowKey, colKey);
                } else {
                    value = callback(this, rowKey, colKey)
                }
            } else {
                value = initValue;
            }
            row[colKey] = value;
        }

        return this;
    }

    appendCol(colKey, callback, scope) {
        if (this.hasColKey(colKey)) {
            return this;
        }
        if (typeof (colKey) === 'number') {
            colKey = this.colKeys[colKey];
        }

        var isCallbackMode = (typeof (callback) === 'function');
        var initValue = (isCallbackMode) ? undefined : callback;

        this.colKeys.push(colKey);
        var table = this.table;
        var rowKey, rowKeys = this.rowKeys,
            value;
        for (var i = 0, len = rowKeys.length; i < len; i++) {
            rowKey = rowKeys[i];

            if (isCallbackMode) {
                if (scope) {
                    value = callback.call(scope, this, rowKey, colKey);
                } else {
                    value = callback(this, rowKey, colKey);
                }
            } else {
                value = initValue;
            }
            table[rowKey][colKey] = value;
        }

        return this;
    }

    removeRol(rowKey) {
        var idx;
        if (typeof (rowKey) === 'number') {
            idx = (this.rowKeys.length > rowKey) ? rowKey : -1;
        } else {
            idx = this.rowKeys.indexOf(rowKey);
        }

        if (idx === -1) {
            return this;
        }
        this.rowKeys.splice(idx, 1);

        delete this.table[rowKey];
        return this;
    }

    removeCol(colKey) {
        var idx;
        if (typeof (colKey) === 'number') {
            idx = (this.colKeys.length > colKey) ? colKey : -1;
        } else {
            idx = this.colKeys.indexOf(colKey);
        }

        if (idx === -1) {
            return this;
        }
        this.colKeys.splice(idx, 1);

        var table = this.table;
        var rowKeys = this.rowKeys;
        for (var i = 0, len = rowKeys.length; i < len; i++) {
            delete table[rowKeys[i]][colKey];
        }
        return this;
    }

    eachRow(colKey, callback, scope) {
        if (typeof (colKey) === 'number') {
            colKey = this.colKeys[colKey];
        }

        var rowKeys = this.rowKeys,
            rowKey, value;
        var isValidColKey = this.hasColKey(colKey);

        for (var i = 0, len = rowKeys.length; i < len; i++) {
            rowKey = rowKeys[i];
            if (isValidColKey) {
                value = this.get(rowKey, colKey);
            }

            if (scope) {
                callback.call(scope, this, rowKey, colKey, value);
            } else {
                callback(this, rowKey, colKey, value);
            }
        }
        return this;
    }

    eachCol(rowKey, callback, scope) {
        if (typeof (rowKey) === 'number') {
            rowKey = this.rowKeys[rowKey];
        }

        var colKeys = this.colKeys,
            colKey, value;
        var isValidRowKey = this.hasRowKey(rowKey);
        for (var i = 0, len = colKeys.length; i < len; i++) {
            colKey = colKeys[i];
            if (isValidRowKey) {
                value = this.get(rowKey, colKey);
            }

            if (scope) {
                callback.call(scope, this, rowKey, colKey, value);
            } else {
                callback(scope, this, rowKey, colKey, value);
            }
        }
        return this;
    }

    convertCol(colKey, callback, scope) {
        if (typeof (colKey) === 'number') {
            colKey = this.colKeys[colKey];
        }

        if (callback === undefined) {
            callback = TypeConvert;
        }

        if (Array.isArray(colKey)) {
            for (var i = 0, len = colKey.length; i < len; i++) {
                this.convertCol(colKey[i], callback, scope);
            }
            return this;
        }

        if (!this.hasColKey(colKey)) {
            return this;
        }

        var table = this.table,
            row;
        var rowKey, rowKeys = this.rowKeys,
            value;
        for (var r = 0, rcnt = rowKeys.length; r < rcnt; r++) {
            rowKey = rowKeys[r];
            row = table[rowKey];
            value = row[colKey];
            if (scope) {
                value = callback.call(scope, this, rowKey, colKey, value);
            } else {
                value = callback(this, rowKey, colKey, value);
            }

            row[colKey] = value;
        }
        return this;
    }

    convertRow(rowKey, callback, scope) {
        if (typeof (rowKey) === 'number') {
            rowKey = this.rowKeys[rowKey];
        }

        if (callback === undefined) {
            callback = TypeConvert;
        }

        if (Array.isArray(rowKey)) {
            for (var i = 0, len = rowKey.length; i < len; i++) {
                this.convertRow(rowKey[i], callback, scope);
            }
            return this;
        }

        var row = this.table[rowKey];
        var colKey, colKeys = this.colKeys,
            value;
        for (var c = 0, ccnt = colKeys.length; c < ccnt; c++) {
            colKey = colKeys[r];
            value = row[colKey];
            if (scope) {
                value = callback.call(scope, this, rowKey, colKey, value);
            } else {
                value = callback(this, rowKey, colKey, value);
            }

            row[colKey] = value;
        }
        return this;

    }

    get curColKey() {
        return this.cursor.colKey;
    }

    get curRowKey() {
        return this.cursor.rowKey;
    }

    nextColKey(colKey, step) {
        if (colKey === undefined) {
            colKey = this.cursor.colKey;
        }
        if (step === undefined) {
            step = 1;
        }

        var colKeys = this.colKeys;
        var idx = colKeys.indexOf(colKey);
        if (idx === -1) {
            return undefined;
        }
        return colKeys[idx + step];
    }

    nextRowKey(rowKey, step) {
        if (rowKey === undefined) {
            rowKey = this.cursor.rowKey;
        }
        if (step === undefined) {
            step = 1;
        }

        var rowKeys = this.rowKeys;
        var idx = rowKeys.indexOf(rowKey);
        if (idx === -1) {
            return undefined;
        }
        return rowKeys[idx + 1];
    }

    previousColKey(colKey, step) {
        if (step === undefined) {
            step = 1;
        }
        step = -step;
        return this.nextColKey(colKey, step);
    }

    previousRowKey(rowKey, step) {
        if (step === undefined) {
            step = 1;
        }
        step = -step;
        return this.nextRowlKey(rowKey, step);
    }

    sortCol(callback, scope) {
        if (typeof (callback) === 'function') {
            if (scope) {
                callback = callback.bind(scope);
            }
        } else {
            var colKey = callback;
            if (!this.hasColKey(colKey)) {
                return this;
            }
            var mode = scope;
            if (typeof (mode) === 'string') {
                mode = SORTMODE[mode];
            }
            var table = this;
            callback = function (rowKeyA, rowKeyB) {
                var valA = table.get(rowKeyA, colKey);
                var valB = table.get(rowKeyB, colKey);
                var retVal;
                if (mode >= 2) {
                    valA = parseFloat(valA);
                    valB = parseFloat(valB);
                }
                switch (mode) {
                    case 0:
                    case 2:
                        retVal = (valA > valB) ? 1 :
                            (valA < valB) ? -1 : 0;
                        break;

                    case 1:
                    case 3:
                        retVal = (valA < valB) ? 1 :
                            (valA > valB) ? -1 : 0;
                        break;
                }
                return retVal;
            }
        }

        this.rowKeys.sort(callback);
        return this;
    }

    sortRow(callback, scope) {
        if (typeof (callback) === 'function') {
            if (scope) {
                callback = callback.bind(scope);
            }
        } else {
            var rowKey = callback;
            if (!this.hasRowKey(rowKey)) {
                return this;
            }
            var mode = scope;
            if (typeof (mode) === 'string') {
                mode = SORTMODE[mode];
            }
            var table = this;
            callback = function (colKeyA, colKeyB) {
                var valA = table.get(rowKey, colKeyA);
                var valB = table.get(rowKey, colKeyB);
                var retVal;
                if (mode >= 2) {
                    valA = parseFloat(valA);
                    valB = parseFloat(valB);
                }
                switch (mode) {
                    case 0:
                    case 2:
                        retVal = (valA > valB) ? 1 :
                            (valA < valB) ? -1 : 0;
                        break;

                    case 1:
                    case 3:
                        retVal = (valA < valB) ? 1 :
                            (valA > valB) ? -1 : 0;
                        break;
                }
                return retVal;
            }
        }

        this.colKeys.sort(callback);
        return this;
    }

    setCursor(rowKey, colKey) {
        var cursor = this.cursor;
        cursor.rowKey = rowKey;
        cursor.colKey = colKey;
        return this;
    }

}

const SORTMODE = {
    'ascending': 0,
    'descending': 1,
    'logical ascending': 2,
    'logical descending': 3
}
export default CsvToHashTable;