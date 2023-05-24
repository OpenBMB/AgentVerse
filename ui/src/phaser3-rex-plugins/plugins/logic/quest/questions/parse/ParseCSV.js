import GetValue from '../../../../utils/object/GetValue.js';
import CSVParser from 'papaparse/papaparse.min.js';
import DefaultConvertFn from '../../../../utils/string/TypeConvert.js';

var ParseCSV = function (csvString, config) {
    var delimiter = GetValue(config, 'delimiter', ',');
    var arr = CSVParser.parse(csvString, {
        header: true,
        delimiter: delimiter,
    }).data;

    var questionType = GetValue(config, 'types.question', 'q');
    var optionType = GetValue(config, 'types.option', '');
    var convertFn = GetValue(config, 'convert', true);
    if (convertFn === true) {
        convertFn = DefaultConvertFn;
    }

    var items = [];
    var rowObj, rowType,
        item, option;
    for (var i = 0, cnt = arr.length; i < cnt; i++) {
        rowObj = arr[i];
        rowType = rowObj.type;
        delete rowObj.type;

        if (rowType === questionType) {
            item = rowObj;
            if (item.key === '') {
                delete item.key;
            }

            convert(item, convertFn);

            item.options = [];
            items.push(item);
        } else if (rowType === optionType) {
            if (item) {
                option = rowObj;
                if (option.key === '') {
                    delete option.key;
                }

                convert(option, convertFn);
                item.options.push(option);
            } else {
                // Error
            }
        }
    }

    return items;
};

var convert = function (item, convertFn) {
    if (!convertFn) {
        return item;
    }

    for (var key in item) {
        item[key] = convertFn(item[key], key);
    }
    return item;
}

export default ParseCSV;