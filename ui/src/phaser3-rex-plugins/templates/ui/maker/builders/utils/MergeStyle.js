import DeepMerge from "../../../../../plugins/utils/object/DeepMerge";

/*
Priority of styles : name, $class, $type
  1. name    (#name)
  2. $class  (.class)
  3. $type   (type)    
*/

var MergeStyle = function (data, styles) {
    if (styles === undefined) {
        return data;
    }

    if (data.hasOwnProperty('name')) {
        DeepMerge(data, styles[`#${data.name}`]);
    }

    if (data.hasOwnProperty('$class')) {
        var clasKeys = data.$class.split(' ');
        for (var i = 0, cnt = clasKeys.length; i < cnt; i++) {
            DeepMerge(data, styles[`.${clasKeys[i]}`]);
        }
    }

    if (data.hasOwnProperty('$type')) {
        DeepMerge(data, styles[data.$type]);
    }

    return data;
}

export default MergeStyle;