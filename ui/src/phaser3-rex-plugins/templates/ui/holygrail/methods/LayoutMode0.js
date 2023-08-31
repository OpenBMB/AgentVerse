/*
Elements:
    ```
    HHH
    LCR
    FFF
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
    */    
    var bodySizer = CreatExpandContainer(scene, 0);
    this.add(bodySizer, GetAddContainerConfig(config));

    // Add Left-side
    var leftSide = config.leftSide;
    if (leftSide) {
        bodySizer.add(leftSide, GetAddLeftSideConfig(config));
    }

    // Add content
    var content = config.content;
    if (content) {
        bodySizer.add(content, GetAddContentConfig(config));
    }

    // Add Right-side
    var rightSide = config.rightSide;
    if (rightSide) {
        bodySizer.add(rightSide, GetAddRightSideConfig(config));
    }

    // Add Footer
    var footer = config.footer;
    if (footer) {
        this.add(footer, GetAddFooterConfig(config));
    }
}

export default LayoutMode0;