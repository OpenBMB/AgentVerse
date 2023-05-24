import DropDownList from '../dropdownlist/DropDownList.js';
import BuildListConfig from '../utils/build/BuildListConfig.js';

class SimpleDropDownList extends DropDownList {
    constructor(scene, config, creators) {
        config = BuildListConfig(scene, config, creators);
        super(scene, config);
        this.type = 'rexSimpleDropDownList';
    }

    setOptions(options) {
        if (options === undefined) {
            options = [];
        }
        for (var i = 0, cnt = options.length; i < cnt; i++) {
            var option = options[i];
            if (typeof (option) === 'string') {
                options[i] = { text: option, value: option };
            }
        }
        super.setOptions(options);
        return this;
    }

}

export default SimpleDropDownList;