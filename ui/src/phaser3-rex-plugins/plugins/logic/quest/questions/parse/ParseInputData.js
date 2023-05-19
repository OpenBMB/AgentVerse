import GetValue from '../../../../utils/object/GetValue.js';
import ParseCSV from './ParseCSV.js';
import ParseYaml from './ParseYaml.js';

var ParseInputData = function (inputData, config) {
    if (typeof (config) === 'string') {
        config = { format: config };
    }

    var inputType;
    if (typeof (inputData) === 'string') {
        inputType = GetValue(config, 'format', 'csv');
    } else {
        inputType = GetValue(config, 'format', undefined);
    }

    switch (inputType) {
        case 'csv':
            inputData = ParseCSV(inputData, config);
            break;

        case 'yaml':
            inputData = ParseYaml(inputData, config);
            break;

        case 'json':
            inputData = JSON.parse(inputData);
            break;
    }

    return inputData;
}

export default ParseInputData;