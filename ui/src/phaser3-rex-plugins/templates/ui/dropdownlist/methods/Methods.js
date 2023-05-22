import ConfigurationMethods from './listpanel/ConfigurationMethods.js';
import OpenListPanel from './listpanel/OpenListPanel.js';
import CloseListPanel from './listpanel/CloseListPanel.js';
import ToggleListPanel from './listpanel/ToggleListPanel.js';

var Methods = {
    openListPanel: OpenListPanel,
    closeListPanel: CloseListPanel,
    toggleListPanel: ToggleListPanel,
}

Object.assign(
    Methods,
    ConfigurationMethods,
);

export default Methods;

