/*
Elements:
    ```
    HHH
    LCR
    LFR
    ```
*/

import {
    GetAddHeaderConfig,
    GetAddLeftSideConfig, GetAddContentConfig, GetAddRightSideConfig,
    GetAddFooterConfig,
    GetAddContainerConfig
} from './GetAddChildConfig.js';
import CreatExpandContainer from './CreatExpandContainer.js';

var LayoutMode0 = function (config) {
    var scene = this.scene;

    // Add Header
    var header = config.header;
    if (header) {
        this.add(header, GetAddHeaderConfig(config));
    }

    /*
    L C R
    L F R
    */    
    var bodySizer0 = CreatExpandContainer(scene, 0);
    this.add(bodySizer0, GetAddContainerConfig(config));

    // Add Left-side
    var leftSide = config.leftSide;
    if (leftSide) {
        bodySizer0.add(leftSide, GetAddLeftSideConfig(config));
    }

    /*
    C

    F
    */    
    var bodySizer1 = CreatExpandContainer(scene, 1);
    bodySizer0.add(bodySizer1, GetAddContainerConfig(config));

    // Add content
    var content = config.content;
    if (content) {
        bodySizer1.add(content, GetAddContentConfig(config));
    }

    // Add Footer
    var footer = config.footer;
    if (footer) {
        bodySizer1.add(footer, GetAddFooterConfig(config));
    }

    // Add Right-side
    var rightSide = config.rightSide;
    if (rightSide) {
        bodySizer0.add(rightSide, GetAddRightSideConfig(config));
    }

}

export default LayoutMode0;