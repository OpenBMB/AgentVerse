import CSVParser from 'papaparse/papaparse.min.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CSVToArray = function (csvString, config) {
    var delimiter = GetValue(config, 'delimiter', ',');
    var convert = GetValue(config, 'convert', true);

    var arr = CSVParser.parse(csvString, {
        delimiter: delimiter,
        dynamicTyping: convert
    }).data;
    return arr;
};

export default CSVToArray;