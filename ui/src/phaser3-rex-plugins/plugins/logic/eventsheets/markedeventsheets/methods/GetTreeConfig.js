import ParseProperty from './ParseProperty.js';

var GetTreeConfig = function (paragraphs) {
    var config = {};
    paragraphs.forEach(function (paragraph) {        
        var lines = paragraph.text.split('\n');
        lines.forEach(function (line) {
            ParseProperty(line, config);
        })
    })

    return config;
}

export default GetTreeConfig;